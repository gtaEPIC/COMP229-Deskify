var express = require('express');
var router = express.Router();

let userRegistrationController = require("../controllers/userResgistration");

router.get("/", userRegistrationController.getAllUsers);
router.post("/", userRegistrationController.createUser);
router.get("/:username", userRegistrationController.userByusername);
router.put("/:username", userRegistrationController.update);
router.delete("/:username", userRegistrationController.deleteUser);

module.exports = router;