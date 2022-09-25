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
    } catch(err) {
        res.json({ message : err.message })
    }
}

/*
Post Activity Data to Database
Path Name: server/activity/
*/
exports.newActivity = async (req, res) => {   
    const user = new activitySchema(req.body)
    try {
      const savedActivity = await activitySchema.save()
      res.json(savedActivity)
    } catch(err) {
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