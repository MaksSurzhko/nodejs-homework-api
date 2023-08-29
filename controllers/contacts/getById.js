const Contact = require("../../models/contact");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId);
  if (!contactById) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json(contactById);
};
module.exports = getById;
