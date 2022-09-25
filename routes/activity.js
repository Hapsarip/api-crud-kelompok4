const express = require('express');
const router = express.Router();
const { getUser, getUsers } = require('../controllers/activity');

router.get('/', getActivities);
router.get('/:id', getActivity);

module.exports = router;