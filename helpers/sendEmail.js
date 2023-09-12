const sendGridMail = require("@sendgrid/mail");
require("dotenv").config();
const { SENDGRID_API_KEY } = process.env;

sendGridMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "lizapikovskaya@gmail.com" };
    await sendGridMail.send(email);
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;