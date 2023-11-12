var express = require('express');
var router = express.Router();

let userRegistrationController = require("../controllers/userResgistration");

router.get("/users", userRegistrationController.getAllUsers);
router.post("/create", userRegistrationController.createUser);
router.get("/get/:username", userRegistrationController.userByusername);
router.put("/edit/:username", userRegistrationController.update);
router.delete("/delete/:username", userRegistrationController.deleteUser);

module.exports = router;