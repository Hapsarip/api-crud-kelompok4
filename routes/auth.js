const express = require('express');
const router = express.Router();
const { SignUp, Login } = require("../controllers/auth")

/*
Sign Up to the App
Path Name: server/user/signup
*/
router.post('/signup', SignUp)

/*
Log In to the App
Path Name: server/user/signup
*/
router.post('/login', Login)

module.exports = router;