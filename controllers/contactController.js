// usually all api methos logic will be seperated in a controller files

// Express Async Handler used to handle asynchronous exceptions caused by asyncronous routes
// to use asyncHandler simply wrap around the async functions, which handles itself and passes tp exceptional handler whenever an exception occurs
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactSchema");

// @desc Get All Contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
  // find is used to get all list of items
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc Create New Contact
// @route POST /api/contacts
// @access private
// Usually post method status will be 201, which is created new item
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }
  // create is used to create new items
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// @desc Edit Contact
// @route PUT /api/contact/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User dont have permission to do this task");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

// @desc Get Contact
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(200).json(contact);
});

// @desc Delete Contact
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User dont have permission to do this task");
  }

  // To delete we need to follow this method
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  updateContact,
  getContact,
  deleteContact,
};
