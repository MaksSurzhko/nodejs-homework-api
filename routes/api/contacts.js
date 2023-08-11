const express = require("express");
const router = express.Router();
const operations = require("../../models/contacts");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
router.get("/", async (req, res, next) => {
  try {
    const contacts = await operations.listContacts();
    // res.json(contacts);
    res.json({
      status: "success",
      code: "200",
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await operations.getContactById(contactId);
    if (!contactById) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: "200",
      data: {
        result: contactById,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = schema.validate(body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = operations.addContact(body);
    res.status(201).json({
      status: "success",
      code: "201",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await operations.removeContact(contactId);
    if (!deletedContact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json({
      status: "delete success",
      code: "204",
      data: {
        result: deletedContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    const { error } = schema.validate(body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const updatedContact = await operations.updateContact(contactId, body);
    if (!updatedContact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json({
      status: "updated success",
      data: {
        result: updatedContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;