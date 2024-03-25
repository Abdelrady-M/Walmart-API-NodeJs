const jwt = require("jsonwebtoken");
const { promisify } = require("util");
async function auth(req, res, next) {
  // check the authentication header exist in request
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "please login first" });
  }
  try {
    let decode = await promisify(jwt.verify)(authorization, process.env.SECRET);
    req.id = decode.id; 
    next();
  } catch (error) {
    res.status(401).json({ message: "please login first" });
  }
  console.log("authorization");
}
module.exports = { auth };
