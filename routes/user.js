const express = require('express');
const { editUser, deleteUser, getUser, newUser, getUsers } = require('../controllers/user');
const router = express.Router();

/*
Get All User Data from Database
Path Name: server/users/
*/
router.get('/', getUsers);

/*
Post User Data to Database
Path Name: server/users/
*/
router.post('/', newUser);

/*
Get Specific User Data from Database by their Id
Path Name: server/users/{ user id }
*/
router.get('/:id', getUser);

/*
Delete User Data from Database by their Id
Path Name: server/users/{ user id }
*/
router.delete('/:id', deleteUser);

/*
Edit User Data from Database by their Id
Path Name: server/users/{ user id }
*/
router.patch('/:id', editUser);

/*
Get Specifif Item from Database
Path Name: server/users/
*/

module.exports = router;