const User = require ('../models/user')
const Activity = require ('../models/activity')

/*
Get All User Data from Database
Path Name: server/users/
*/
exports.getUsers = async (req, res, next) => {
    try {
      const users = await User.find().populate({
        path: "activities", 
        model: Activity
      })
      res
        .status(200)
        .json(users)

    } catch(err) {
      next(err)
    }
}

/*
Post User Data to Database
Path Name: server/users/
*/
exports.newUser = async (req, res, next) => {   
    const user = new User(req.body)
    try {
      const savedPost = await user.save()
      res
        .status(201)
        .json(savedPost)

    } catch(err) {
      next(err)
    }
}

/*
Get Specific User Data from Database by their Id
Path Name: server/users/{ user id }
*/
exports.getUser = async (req, res, next) => {
    try {
      const userById = await User.findById( req.params.id )
      res
        .status(200)
        .json(userById)

    } catch(err) {
      next(err)
    }
}

/*
Delete User Data from Database by their Id
Path Name: server/users/{ user id }
*/
exports.deleteUser = async (req, res, next) => { 
    try {
      const removedPost = await User.remove({ 
        _id : req.params.id 
      })
      res
        .status(200)
        .json(removedPost)

    } catch(err) {
      next(err)
    }
}

/*
Edit User Data from Database by their Id
Path Name: server/users/{ user id }
*/
exports.editUser = async (req,res, next) => {
    try { 
      const updatedPost = await User.updateOne (
        { _id : req.params.id },
        { $set: req.body }
      )
      res
        .status(200)
        .json(updatedPost)

    } catch{
      next(err)
    }
}
  
