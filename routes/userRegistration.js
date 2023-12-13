var express = require('express');
var router = express.Router();

let userRegistrationController = require("../controllers/userResgistration");
const {requireSignin} = require("../controllers/authController");

router.get("/", userRegistrationController.getAllUsers);
router.post("/", userRegistrationController.createUser);
router.get("/:username", userRegistrationController.userByusername);
router.put("/:username", requireSignin, userRegistrationController.update);
router.delete("/:username", userRegistrationController.disableUser);

module.exports = router;