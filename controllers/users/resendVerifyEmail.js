const { User } = require("../../models/user");
const HttpError = require("./../../helpers/HttpError");
const sendEmail = require("../../helpers/sendEmail");
const { verifyEmailSchema } = require("../../models/user");
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const { error } = verifyEmailSchema.validate({ email });
  if (error) {
    error.status = 400;
    error.message = "missing required field email";
    throw error;
  }
  const user = await User.findOne({ email });
  if (!user || !user.verify) {
    HttpError(404, "User not found or not verified.");
  }
  // if (user.verify) {
  //   HttpError(400, "Verification has already been passed");
  // }
 
  if (user.verify) {
   res.status(400).json({
     message: "Verification has already been passed",
   });
     return;
}

  const mail = {
    to: email,
    subject: "Підтвердження реєстрації",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Для підтвердження реєстрації перейдіть по посиланню.</a>`,
  };

  sendEmail(mail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
