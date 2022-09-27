const userSchema = require ('../models/user')
const activitySchema = require ('../models/activity')

/*
Get All Activities from Database
Path Name: server/activity
*/
exports.getActivities = async (req, res) => {
    try {
      const activities = await activitySchema.find().populate({path: "actuser", model: userSchema})
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
    } catch(err) {
        res.json({ message : err.message })
    }
}

/*
Post Activity Data to Database
Path Name: server/activity/
*/

exports.newActivity = async (req, res) => { 
    try {
      const activity = new activitySchema({
        ...req.body,
        actuser: req.body.id
      })

      const updatedUser = await userSchema.updateOne(
        { _id : req.body.id },
        { $push: { activities: activity._id } }
      )

      const savedActivity = await activity.save()
      res.json({savedActivity, updatedUser})

    } catch {
      res.json({ message : err.message })
    }
}

/*
Delete Activity Data from Database by their Id
Path Name: server/activity/{ activity id }
*/

exports.deleteActivity = async (req, res) => { 
    try {
      const removedActivity = await activitySchema.remove({ _id : req.params.id })
      res.json(removedActivity)
    } catch(err) {
      res.json({ message : err.message })
    }
}