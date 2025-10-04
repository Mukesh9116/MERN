const express = require("express");
// const { route } = require("./auth_router");
const router = express.Router();
const contactForm = require("../controllers/contact_controller");
const contactSchema = require("../validators/contact_validation");
const contactvalidate  = require("../middlewares/contact_validate_midleware");
router.route("/contact").post(contactvalidate(contactSchema),contactForm);
module.exports = router;