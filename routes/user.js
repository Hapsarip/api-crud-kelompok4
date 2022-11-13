const express = require('express');
const router = express.Router();
const { editUser, deleteUser, getUsers } = require('../controllers/user');
const { authMid } = require('../middleware/authMiddleware')

/*
Get Delete Edit Specific User Data from Database by their Id
Path Name: server/users/{ user id }
*/

router
  .route('/profile')
  .get(authMid, getUsers)
  .delete(authMid, deleteUser)
  .patch(authMid, editUser);

module.exports = router;