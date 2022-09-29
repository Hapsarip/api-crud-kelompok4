const express = require('express');
const router = express.Router();
const { getActivities, getActivity, editActivity, newActivity, deleteActivity, findActivity } = require('../controllers/activity');

/*
Get All Activities from Database
Path Name: server/activity

Post Activity Data to Database
Path Name: server/activity/
*/

router
  .route('/')
  .get(getActivities)
  .post(newActivity)

router
  .route('/search')
  .get(findActivity)

/*
Get Specific Activity from Database by their Id
Path Name: server/activity/{ activity id }

Edit Activity Data from Database by their Id
Path Name: server/activity/{ activity id }

Delete Activity Data from Database by their Id
Path Name: server/activity/{ activity id }
*/

router
  .route('./:id')
  .get(getActivity)
  .patch(editActivity)
  .delete(deleteActivity)

module.exports = router;