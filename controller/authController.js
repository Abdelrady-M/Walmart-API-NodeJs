const usersModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// Generate token
function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}

/* =========================== signUp =========================== */

const signUp = async (req, res) => {
  const { email, password, name } = req.body;

  const userId = req.param.id;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Please provide your email, password, and name" });
  }

  const user = await usersModel.findOne({ email });
  try {
    if (user)
      return res.status(404).json({ message: "You already have an account, please sign in" });
    if (userId) {
      req.body._id = userId;
    }
    const newUser = await usersModel.create({ email, password, name });
    const tokenPayload = {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name
    };
    const token = generateToken(tokenPayload);
    res.cookie("authenticate", token);
    res.status(201).json({
      token: token,
      message: "User is saved",
      data: { user: newUser },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// // =========================== signIn ===========================

// const signIn = async (req, res) => {
//   console.log("sign in func()");
//   const { email, password } = req.body;
//   console.log(email, password);

//   if (!email || !password) {
//     console.log("inside if ");
//     return res
//       .status(400)
//       .json({ message: "please provide your user name and password" });
//   }

//   // Check the user is existed
//   const user = await usersModel.findOne({ email });

//   // Ensure the user object is fully populated before accessing the password
//   await Promise.all([user]);

//   if (!user) {
//     return res
//       .status(404)
//       .json({ message: "Not existed user please register" });
//   }

//   console.log("this is current user", user);

//   // Verify that the password field is not null or undefined
//   if (!user.password) {
//     console.log("password error from server ");
//     return res
//       .status(500)
//       .json({ message: "Internal server error, password missing" });
//   }

//   // Wait for the password comparison to complete
//   let isValid = await bcrypt.compare(password, user.password);
//   console.log("this is the is valid", isValid);

//   if (!isValid) {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }
//   console.log("isValid", isValid);
//   return res.status(200).json({ token: generateToken(user._id) });
// };

const signIn = async (req, res) => {
  console.log("request is RECEIVED from signin funtcion ");
  const { email, password } = req.body;


  // Check if email & password are present in the request body
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide your email and password" });
  }

  // Check if the user with the given email exists in our DB
  const user = await usersModel.findOne({ email }).select("+password");

  if (!user) {
    return res
      .status(404)
      .json({ message: "Provided user does not exist, please sign up first" });
  }

  try {
    const isValid = await bcrypt.compare(password, user.password);
    // console.log(isValid);
    console.log("password", password);
    console.log("userPassword", user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const tokenPayload = {
      id: user._id,
      email: user.email,
      name: user.name
    };
    const token = generateToken(tokenPayload);

    res.status(200).json({
      token: token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      name: user.name // Include the name separately in the response if needed
    });
  } catch (error) {
    // Handle any errors related to bcrypt.compare() here
    console.error("Error comparing passwords:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =========================== logout ===========================

const logOut = async (req, res) => {
  res.clearCookie("authenticate");
  res.json({ message: "signout success" });
};

// =========================== protect ===========================

const protect = async (req, res, next) => {
  // step 1 => read the token && check if is it exist
  // check the authentication header exist in request
  // step 2 => validate the token
  // step 3 => if the user exist
  // step 4 => if the user changed the password after the token is issued

  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "please login first" });
  }
  try {
    let decode = await promisify(jwt.verify)(
      authorization,
      process.env.JWT_SECRET
    );
    req.id = decode.id;
    // Check if the user exists in the database
    const user = await usersModel.findById(decode.id);
    if (!user) {
      throw new Error("User not found");
    }
    // Check if the user has changed their password since the token was issued
    // if (user.passwordChangedAt > decode.iat) {
    //   throw new Error("Password has changed");
    // }
    req.user = user;
    console.log(req.user);
    next();
  } catch (error) {
    // Use a more specific error message in the catch block
    if (error.message === "User not found") {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  }
};
/*
 else if (error.message === "Password has changed") {
      res.status(401).json({ message: "Password has changed" });
    }
    */
// =========================== restrict ===========================

const restrict = (role) => {
  console.log(role);
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    next();
  };
};

module.exports = { signUp, signIn, logOut, protect, restrict };
