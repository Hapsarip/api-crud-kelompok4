const userSchema = require ('../models/user')
const activitySchema = require ('../models/activity')

/*
Get All Activities from Database
Path Name: server/user/{ user id }/activities
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
Path Name: server/users/{ user id }/activity/{ activity id}
*/
exports.getActivity = async (req, res) => {
    try {
      const activityById = await activitySchema.findById( req.params.id )
      res.json(activityById)
    } catch(err) {
      res.json({ message : err.message })
    }
}