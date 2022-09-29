const User = require ('../models/user')
const Activity = require ('../models/activity')

/*
Get All User Data from Database
Path Name: server/users/
*/
exports.getUsers = async (req, res) => {
    try {
      const users = await User.find().populate({path: "activities", model: Activity})
      res.status(200).json(users)
    } catch(err) {
      res.status(400).json({ message : err.message })
    }
}

/*
Post User Data to Database
Path Name: server/users/
*/
exports.newUser = async (req, res) => {   
    const user = new User(req.body)
    try {
      const savedPost = await user.save()
      res.status(200).json(savedPost)
    } catch(err) {
      res.status(400).json({ message : err.message })
    }
}

/*
Get Specific User Data from Database by their Id
Path Name: server/users/{ user id }
*/
exports.getUser = async (req, res) => {
    try {
      const userById = await User.findById( req.params.id )
      res.status(200).json(userById)
    } catch(err) {
      res.status(400).json({ message : err.message })
    }
}

/*
Delete User Data from Database by their Id
Path Name: server/users/{ user id }
*/
exports.deleteUser = async (req, res) => { 
    try {
      const removedPost = await User.remove({ _id : req.params.id })
      res.status(200).json(removedPost)
    } catch(err) {
      res.status(400).json({ message : err.message })
    }
}

/*
Edit User Data from Database by their Id
Path Name: server/users/{ user id }
*/
exports.editUser = async (req,res) => {
    try { 
      const updatedPost = await User.updateOne (
        { _id : req.params.id },
        { $set: req.body }
      )
      res.status(200).json(updatedPost)
    } catch{
      res.status(400).json({ message : err.message })
    }
}
  
