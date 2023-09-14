const { User } = require("../../models/user");
const HttpError = require("./../../helpers/HttpError");

// const verifyEmail = async (req, res) => {
//   const { verificationToken } = req.params;
//   const user = await User.findOne({ verificationToken });
//   if (!user) {
//     HttpError(404, "User not found");
//   }

//   await User.findByIdAndUpdate(user._id, {
//     verificationToken: null,
//     verify: true,
//   });

//   res.json({
//     message: "Verification successful",
//   });
// };

// module.exports = verifyEmail;

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, 'User not found');
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    message: 'Verification successful',
  });
};

module.exports = verifyEmail;