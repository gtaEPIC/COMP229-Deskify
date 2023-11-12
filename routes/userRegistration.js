var express = require('express');
var router = express.Router();

let userRegistrationController = require("../controllers/userResgistration");

// TODO: router.get("/users", userRegistrationController.getAllusers);
router.post("/create", userRegistrationController.createUser);
//TODO: router.get("/get/:username", userRegistrationController.userByusername, userRegistrationController.read);
//TODO: router.put("/edit/:username", userRegistrationController.update);
//TODO: router.delete("/delete/:username", userRegistrationController.deleteUser);

module.exports = router;