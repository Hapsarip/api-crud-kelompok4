const express = require('express');
const { editUser, deleteUser, getUser, newUser, getUsers } = require('../controllers/user');
const router = express.Router();

/*
Get All User Data from Database
Path Name: server/users/

Post User Data to Database
Path Name: server/users/
*/
router
  .route('/')
  .get(getUsers)
  .post(newUser)

/*
Get Specific User Data from Database by their Id
Path Name: server/users/{ user id }

Delete User Data from Database by their Id
Path Name: server/users/{ user id }

Edit User Data from Database by their Id
Path Name: server/users/{ user id }
*/
router
  .route('/')  
  .get(getUser)
  .delete(deleteUser)
  .patch(editUser);

module.exports = router;