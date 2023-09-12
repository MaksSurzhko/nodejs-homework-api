const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const avatar = require("./avatar");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");
module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  avatar,
  verifyEmail,
  resendVerifyEmail,
};