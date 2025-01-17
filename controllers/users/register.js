const { registerSchema } = require("../../models/user");
const HttpError = require("../../helpers/HttpError");
const { User } = require("../../models/user");
const bcrypt = require("bcrypt");

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
  const hashPassword = await bcrypt.hash(password, 12);
  const newUser = await User.create({ email, password: hashPassword , name});
  res.status(201).json({
      user: {
        email,
        subscription: newUser.subscription,
      },

  });
};

module.exports = register;