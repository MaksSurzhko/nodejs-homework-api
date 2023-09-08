const { Contact } = require("../../models/contact");
const { schema } = require("../../schemas/schemaJoi");

const add = async (req, res) => {
  const body = req.body;
  const { _id } = req.user;
  
  const { error } = schema.validate(body);
  if (error) {
    const missingField = error.details[0].context.label;
    const errorMessage = `Missing required ${missingField} field`;
    const customError = new Error(errorMessage);
    customError.status = 400;
    throw customError;
  }
  const result = await Contact.create({...body, owner: _id});
  res.status(201).json(result);
};

module.exports = add;



