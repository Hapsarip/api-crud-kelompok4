const User = require ('../models/user')

/*
Get All User Data from Database
Path Name: server/users/
*/
exports.getUsers = async (req, res, next) => {
  try {
    const user = await User.findById( req.user._id )
    res
      .status(200)
      .json(user)
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
    const removedUser = await User.remove({ 
      _id : req.user._id
    })
    res
      .status(200)
      .json(removedUser)

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
    const updatedUser = await User.updateOne (
      { _id : req.user._id },
      { $set: req.body }
    )
    res
      .status(200)
      .json(updatedUser)

  } catch{
    next(err)
  }
}
  
