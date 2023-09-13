// const { Schema, model } = require("mongoose");
// const Joi = require("joi");
// const errorMongooseHandler = require("../helpers/errorMongooseHandler");

// const userSchema = new Schema(
//   {
//     password: {
//       type: String,
//       required: [true, "Set password for user"],
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//     },
//     subscription: {
//       type: String,
//       enum: ["starter", "pro", "business"],
//       default: "starter",
//     },
//     token: String,
//     avatarURL: String,
//   },
//   { versionKey: false, timestamps: true }
// );

// userSchema.post("save", errorMongooseHandler);

// const registerSchema = Joi.object({
//   email: Joi.string().required(),
//   password: Joi.string().min(8).required(),
// });

// const loginSchema = Joi.object({
//   email: Joi.string().required(),
//   password: Joi.string().min(8).required(),
// });

// const subscriptionSchema = Joi.object({
//   subscription: Joi.string().valid("starter", "pro", "business"),
// });

// const User = model("user", userSchema);

// module.exports = {
//   User,
//   registerSchema,
//   loginSchema,
//   subscriptionSchema,
// };


const { Schema, model } = require("mongoose");
const Joi = require("joi");
const errorMongooseHandler = require("../helpers/errorMongooseHandler");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", errorMongooseHandler);

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().required(),
});
const User = model("user", userSchema);

module.exports = {
  User,
  registerSchema,
  loginSchema,
  subscriptionSchema,
  verifyEmailSchema,
};