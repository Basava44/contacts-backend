const express = require("express");
const router = express.Router();

const {
  getContacts,
  updateContact,
  createContact,
  getContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

// this way we can protect all the routes we required
router.use(validateToken);

// router.route("/").get(getContacts);
// router.route("/").post(createContact);
// Also can be written like this
router.route("/").get(getContacts).post(createContact);

// router.route("/:id").get(getContact);
// router.route("/:id").put(updateContact);
// router.route("/:id").delete(deleteContact);
// also can be written like this
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
