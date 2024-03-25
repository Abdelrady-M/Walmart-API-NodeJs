const usersModel = require("../models/user");
const sendEmail = require("../utils/sendEmail");

const emailRecovery = async (req, res) => {
  const { email } = req.body;
  console.log("this is the email from backend ", email);
  try {
    const foundUser = await usersModel.findOne({ email });
    // console.log("foundUser111111", foundUser);
    if (!foundUser) {
      return res
        .status(401)
        .json({ message: "Sorry, user does not exist. Please signup first" });
    }

    const resetCode = Math.floor(1000 + Math.random() * 9000);
    console.log("found user before setting in the DB", foundUser);

    foundUser.passwordResetCode = resetCode;
    // console.log(foundUser, "after adding resetCodePass");

    foundUser.passwordResetCodeExpires = new Date(Date.now() + 5 * 60 * 1000);
    await foundUser.save({ validateBeforeSave: false });

    console.log("resetCode before sending email", resetCode);
    await sendEmail(foundUser.email, resetCode);

    res.status(200).json({
      resetCode,
      message: "Password reset code has been sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = emailRecovery;
