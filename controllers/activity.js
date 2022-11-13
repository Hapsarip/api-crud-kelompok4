const User = require ('../models/user')
const Activity = require ('../models/activity')

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

/*
Post Activity Data to Database
Path Name: server/activity/
*/
exports.newActivity = async (req, res) => { 
  try {
    const activity = new Activity({
      ...req.body,
      actUser: req.user._id
    })

    const updatedUser = await User.updateOne(
      { _id : req.body.currentID },
      { $push: { activities: activity._id } }
    )

    const savedActivity = await activity.save()
    res.status(201).json({savedActivity, updatedUser})

  } catch(err) {
    res.status(400).json({ message : err.message })
  }
}

/*
Get Specific Activity from Database by their Id
Path Name: server/activity/{ activity id }
*/
exports.getActivity = async (req, res) => {
    try {
      const activityById = await Activity.findById( req.params.id )
      res.status(200).json(activityById)
    } catch(err) {
      res.status(400).json({ message : err.message })
    }
}

/*
Edit Activity Data from Database by their Id
Path Name: server/activity/{ activity id }
*/
exports.editActivity = async (req,res) => {
    try { 
      const updatedPost = await Activity.updateOne (
        { _id : req.params.id },
        { $set: req.body }
      )
      res.status(200).json(updatedPost)
    } catch(err) {
      res.status(400).json({ message : err.message })
    }
}

/*
Delete Activity Data from Database by their Id
Path Name: server/activity/{ activity id }
*/
exports.deleteActivity = async (req, res) => { 
    try {
      const removedActivity = await Activity.remove({ _id : req.params.id })
      res.status(200).json(removedActivity)
    } catch(err) {
      res.status(400).json({ message : err.message })
    }
}

/*
Get Specific Activity by Custom Parameter
Path Name: server/activity/{ activity id }
*/
exports.findActivity = async (req, res) => {
  try{

    const page = req.query.page - 1 || 0;
    const limit = req.query.limit || 5;
    const search = req.query.search || "";
    
    let sortby = req.query.sort || "actDate";
    let mode = req.query.mode || "asc";
  
    const activity = await Activity
      .find({ actName: { 
        $regex: search, 
        $options: "i" 
      }})
      .skip(page * limit)
      .limit(limit);
  
    // Sorting
    function sortBy(a, b){
      if(typeof a[sortby] === 'string'){
        return a[sortby].localeCompare(b[sortby])
      } else {
        return a[sortby] - b[sortby]
      }
    }

    if (mode === "desc"){
      activity.sort(sortBy).reverse()
    } else {
      activity.sort(sortBy)
    }

    const response = {
      page: page + 1,
      limit,
      data: {
        activity
      }
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message : err.message });
  }
}