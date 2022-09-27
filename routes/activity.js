const express = require('express');
const router = express.Router();
const { getActivities, getActivity, editActivity, newActivity, deleteActivity } = require('../controllers/activity');
const activitySchema = require ('../models/activity')

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

/*
Post Activity Data to Database
Path Name: server/activity/
*/
router.post("/", newActivity)

/*
Delete Activity Data from Database by their Id
Path Name: server/activity/{ activity id }
*/
router.delete("/:id", deleteActivity)

router.get('/search', async (req, res) => {
  try{
    const page = req.query.page - 1 || 0;
    const limit = req.query.limit || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "actdate";
    let mode = req.query.mode || "desc";
    let isCompleted = req.query.isCompleted;

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
		if (sort[1]) {
			sortBy[sort[0]] = sort[1];
		} else {
			sortBy[sort[0]] = mode;
		}

		const activity = await activitySchema.find({ actname: { $regex: search, $options: "i" } })
			.sort(sortBy)
			.skip(page * limit)
			.limit(limit);

		const response = {
			error: false,
			page: page + 1,
			limit,
			activity,
		};

		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: true, message: "Internal Server Error" });
	}
})

module.exports = router;