const express = require("express");

const router = express.Router();

const authcontroller = require("../controllers/auth_controller");

const {signupSchema, loginSchema} = require("../validators/auth_validation");

const validate = require("../middlewares/validate_middleware"); 

const authMiddleware = require("../middlewares/auth_middleware");

router.route("/").get(authcontroller.home);

router.route("/register").post(validate(signupSchema), authcontroller.register);
// validate(signupSchema),
router.route("/login").post(validate(loginSchema),authcontroller.login);
router.route('/user').get(authMiddleware, authcontroller.user);

module.exports = router;

