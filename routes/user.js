const express = require('express');
const { editUser, deleteUser, getUser, newUser, getUsers } = require('../controllers/user');
// const userSchema = require ('../models/user')
const router = express.Router();


/*
Get All User Data from Database
Path Name: server/users/
*/
router.get('/', getUsers);
/*
router.get('/', async (req, res) => {
  try {
    const users = await userSchema.find()
    res.json(users)
  } catch(err) {
    res.json({ message : err.message })
  }
})
*/

/*
Post User Data to Database
Path Name: server/users/
*/
router.post('/', newUser);
/*
router.post('/', async (req, res) => {   
  const user = new userSchema(req.body)
  try {
    const savedPost = await user.save()
    res.json(savedPost)
  } catch(err) {
    res.json({ message : err.message })
  }
})
*/

/*
Get Specific User Data from Database by their Id
Path Name: server/users/{ user id }
*/
router.get('/:id', getUser);
/*
router.get('/:id', async (req, res) => {
  try {
    const userById = await userSchema.findById( req.params.id )
    res.json(userById)
  } catch(err) {
    res.json({ message : err.message })
  }
})
*/

/*
Delete User Data from Database by their Id
Path Name: server/users/{ user id }
*/
router.delete('/:id', deleteUser);
/*
router.delete('/:id', async (req, res) => { 
  try {
    const removedPost = await userSchema.remove({ _id : req.params.id })
    res.json(removedPost)
  } catch(err) {
    res.json({ message : err.message })
  }
})
*/

/*
Edit User Data from Database by their Id
Path Name: server/users/{ user id }
*/
router.patch('/:id', editUser);
/*
router.patch('/:id', async (req,res) => {
  try { 
    const updatedPost = await userSchema.updateOne (
      { _id : req.params.id },
      { $set: req.body }
    )
    res.json(updatedPost)
  } catch{
    res.json({ message : err.message })
  }
})
*/

module.exports = router;