const userSchema = require ('../models/user')

/*
Get All User Data from Database
Path Name: server/users/
*/
exports.getUsers = async (req, res) => {
    try {
      const users = await userSchema.find()
      res.json(users)
    } catch(err) {
      res.json({ message : err.message })
    }
}

/*
Post User Data to Database
Path Name: server/users/
*/
exports.newUser = async (req, res) => {   
    const user = new userSchema(req.body)
    try {
      const savedPost = await user.save()
      res.json(savedPost)
    } catch(err) {
      res.json({ message : err.message })
    }
}


/*
Get Specific User Data from Database by their Id
Path Name: server/users/{ user id }
*/
exports.getUser = async (req, res) => {
    try {
      const userById = await userSchema.findById( req.params.id )
      res.json(userById)
    } catch(err) {
      res.json({ message : err.message })
    }
}

/*
Delete User Data from Database by their Id
Path Name: server/users/{ user id }
*/
exports.deleteUser = async (req, res) => { 
    try {
      const removedPost = await userSchema.remove({ _id : req.params.id })
      res.json(removedPost)
    } catch(err) {
      res.json({ message : err.message })
    }
}

/*
Edit User Data from Database by their Id
Path Name: server/users/{ user id }
*/
exports.editUser = async (req,res) => {
    try { 
      const updatedPost = await userSchema.updateOne (
        { _id : req.params.id },
        { $set: req.body }
      )
      res.json(updatedPost)
    } catch{
      res.json({ message : err.message })
    }
}
  
