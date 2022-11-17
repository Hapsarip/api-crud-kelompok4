const User = require ('../models/user')
const Activity = require ('../models/activity')

exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().populate({path: "actUser", model: User})
    res.status(200).json(activities)
  } catch(err) {
    res.status(400).json({ message : err.message })
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
Get All Activities for current User from Database
Path Name: server/activity
*/
exports.getActivities = async (req, res) => {
  try {
    const activityById = await Activity.find({ actUser : req.user._id })
    res
      .status(200)
      .json(activityById)
  } catch(err) {
    res.status(400).json({ message : err.message })
  }
}
