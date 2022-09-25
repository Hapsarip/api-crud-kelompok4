const express = require('express');
const router = express.Router();
const { getActivities, getActivity, editActivity } = require('../controllers/activity');

/*
Get All Activities from Database
Path Name: server/activity
*/
router.get('/', getActivities);

/*
Get Specific Activity from Database by their Id
Path Name: server/activity/{ activity id }
*/
router.get('/:id', getActivity);

/*
Edit Activity Data from Database by their Id
Path Name: server/activity/{ activity id }
*/
router.patch('/:id', editActivity);

module.exports = router;