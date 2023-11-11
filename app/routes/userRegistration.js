var express = require('express');
var router = express.Router();

let userRegistrationController = require("../controllers/userResgistration");

router.get("/users", userRegistrationController.getAllusers);
router.post("/create", userRegistrationController.createUser);
router.get("/get/:username", userRegistrationController.userByusername, userRegistrationController.read);
router.put("/edit/:username", userRegistrationController.update);
router.delete("/delete/:username", userRegistrationController.deleteUser);