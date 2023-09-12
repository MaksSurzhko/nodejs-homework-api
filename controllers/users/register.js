// const { registerSchema } = require("../../models/user");
// const HttpError = require("../../helpers/HttpError");
// const { User } = require("../../models/user");
// const { nanoid } = require("nanoid");
// const bcrypt = require("bcrypt");
// const gravatar = require("gravatar");
// const sendEmail = require("../../helpers/sendEmail");

// const { BASE_URL } = process.env;
// const register = async (req, res) => {
//   const { email, password, name } = req.body;
//   const { error } = registerSchema.validate(req.body);
//   if (error) {
//     error.status = 400;
//     throw error;
//   }
//   const user = await User.findOne({ email });
//   if (user) {
//     throw HttpError(409, "Email in use");
//   }
//   const urlAvatar = gravatar.url(email);
//   const hashPassword = await bcrypt.hash(password, 12);
//   const verificationToken = nanoid();
//   const newUser = await User.create({
//     email,
//     password: hashPassword,
//     name,
//     urlAvatar,
//   });

//   const mail = {
//     to: email,
//     subject: "Підтвердження реєстрації",
//     html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Для підтвердження реєстрації перейдіть по посиланню.</a>`,
//   };

//   sendEmail(mail);

//   res.status(201).json({
//       user: {
//         email,
//         subscription: newUser.subscription,
//       },
//   });
// };

// module.exports = register;

const { registerSchema } = require("../../models/user");
const HttpError = require("../../helpers/HttpError");
const { User } = require("../../models/user");
const { nanoid } = import("nanoid");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const sendEmail = require("../../helpers/sendEmail");
const { BASE_URL } = process.env;
const register = async (req, res) => {
  const { email, password, name } = req.body;
  const { error } = registerSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const urlAvatar = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 12);
  const verificationToken = nanoid();
  const newUser = await User.create({
    email,
    password: hashPassword,
    name,
    urlAvatar,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Підтвердження реєстрації",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Для підтвердження реєстрації перейдіть по посиланню.</a>`,
  };

  sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription: newUser.subscription,
      },
    },
  });
};

module.exports = register;