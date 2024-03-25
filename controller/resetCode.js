const usersModel = require("../models/user");

const resetCode = async (req, res) => {
  const { enteredCode } = req.body;
  console.log("enteredCode From reset Code", enteredCode);

  if (!enteredCode) {
    return res.status(400).json({ message: "Code is required" });
  } else {
    try {
      const user = await usersModel.findOne({ passwordResetCode: enteredCode });
      console.log("is the user exist with the entered code? ->", user);

      if (user) {
        const codeExpiresAt = user.passwordResetCodeExpires;
        // console.log("codeCreatedAt", codeExpiresAt);
        const currentTime = new Date();
        // console.log("currentTime", currentTime);
        const timeDifference = (codeExpiresAt - currentTime) / (1000 * 60);
        // console.log("timeDifference", timeDifference);
           res.status(200).json({message:'Valid Code'})

        if (timeDifference >= 5) {
          // Code is valid, proceed to the next stage
          console.log("TIME DIFFERENCE IS LESS THAN 5");
          return res.status(200).json({
            message: "Code is valid, proceed to reset password",
            userId: user._id,
          });
        } else if (timeDifference < 0) {
          // Code has expired, inform the user
          console.log("CODE IS SUPPOSED TO EXPIRED");
          return res
            .status(400)
            .json({ message: "Code has expired. Please request a new code" });
        }
      } else {
        // Invalid code, inform the user
        console.log("INVALID CODE");
        return res.status(400).json({ message: "Invalid code" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
module.exports = resetCode;
