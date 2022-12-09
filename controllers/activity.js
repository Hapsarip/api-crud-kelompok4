const User = require ('../models/user')
const Activity = require ('../models/activity')
const moment = require('moment')
moment().format(); 

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
    next(err)
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
      next(err)
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
      next(err)
    }
}

/*
Get Specific Activity by Custom Parameter
Path Name: server/activity/{ activity id }
*/
exports.findActivity = async (req, res) => {
  try{

    const page = req.query.page - 1 || 0;
    const limit = req.query.limit || 100;
    const search = req.query.search || "";
    // const date = "everytime";
    const date = req.query.date || "everytime";

    const sortby = ['actDate', '']
    sortby[1] = req.query.sortby || "actStatus";
    const mode = req.query.mode || "asc";
  
    // Date
    if (date === "everytime"){
      var query = { 
        actUser : req.user._id,
        actName: { 
          $regex: search, 
          $options: "i" 
        },
      }
    } else {
      // date = date.slice(0, 23)
      const startDate = moment(date).startOf('day');
      const endDate = moment(date).endOf('day');

      var query = { 
        actUser : req.user._id,
        actDate: {
          $gte: startDate,
          $lte: endDate
        },
        actName: { 
          $regex: search, 
          $options: "i" 
        },
      }
    }

    // Get act
    const activity = await Activity
      .find(query)
      .skip(page * limit)
      .limit(limit);
  
    // Sorting
    for (var item in sortby){

        function sortBy(a, b){
          if(typeof a[sortby[item]] === 'string'){
            return a[sortby[item]].localeCompare(b[sortby[item]])
          } else {
            return a[sortby[item]] - b[sortby[item]]
          }
        }
    
        if (mode === "desc"){
          activity.sort(sortBy).reverse()
        } else {
          activity.sort(sortBy)
        }
    }
    
    const response = {
      // dat : moment(dat),
      page: page + 1,
      limit,
      data: {
        activity
      }
    };

    res.status(200).json(response);
  } catch (err) {
    next(err)
  }
}