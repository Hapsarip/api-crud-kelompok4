const express = require('express');
const router = express.Router();
const { SignUp, Login, Logout } = require("../controllers/auth")
const { authMid } = require('../middleware/authMiddleware')

/*
Sign Up, Login, Logout to the App
Path Name: server/user/signup
*/
router.post('/signup', SignUp)
router.post('/login', Login)
router.post('/logout', Logout)

module.exports = router;