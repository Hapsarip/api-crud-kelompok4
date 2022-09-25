const userSchema = require ('../models/user')
const activitySchema = require ('../models/activity')

/*
Get All Activities from Database
Path Name: server/activity
*/
exports.getActivities = async (req, res) => {
    try {
      const activities = await activitySchema.find()
      res.json(activities)
    } catch(err) {
      res.json({ message : err.message })
    }
}

/*
Get Specific Activity from Database by their Id
Path Name: server/activity/{ activity id }
*/
exports.getActivity = async (req, res) => {
    try {
      const activityById = await activitySchema.findById( req.params.id )
      res.json(activityById)
    } catch(err) {
      res.json({ message : err.message })
    }
}

/*
Edit Activity Data from Database by their Id
Path Name: server/activity/{ activity id }
*/
exports.editActivity = async (req,res) => {
    try { 
      const updatedPost = await activitySchema.updateOne (
        { _id : req.params.id },
        { $set: req.body }
      )
      res.json(updatedPost)
    } catch{
      res.json({ message : err.message })
    }
}