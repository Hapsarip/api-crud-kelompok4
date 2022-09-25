const express = require('express');
const { editUser, deleteUser, getUser, newUser, getUsers } = require('../controllers/user');
// const userSchema = require ('../models/user')
const router = express.Router();


/*
Get All User Data from Database
Path Name: server/users/
*/
router.get('/', getUsers);

/*
Get Specifi Item from Database
Path Name: server/users/
*/
router.get('/search', async (req, res) => {
  try{
    const page = req.query.page - 1 || 0;
    const limit = req.query.limit || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "dummyDate";
    let mode = req.query.mode || "desc";
    let genre = req.query.isCompleted;

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
		if (sort[1]) {
			sortBy[sort[0]] = sort[1];
		} else {
			sortBy[sort[0]] = mode;
		}

		const user = await userSchema.find({ username: { $regex: search, $options: "i" } })
			.sort(sortBy)
			.skip(page * limit)
			.limit(limit);

		const response = {
			error: false,
			page: page + 1,
			limit,
			user,
		};

		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: true, message: "Internal Server Error" });
	}
})

/*
Post User Data to Database
Path Name: server/users/
*/
router.post('/', newUser);

/*
Get Specific User Data from Database by their Id
Path Name: server/users/{ user id }
*/
router.get('/:id', getUser);

// router.get('/find/:name', async (req, res) => {
//   const name = req.params.name
//   try {
//     const userByName = await userSchema.find({ username : { '$regex' : name, '$options' : 'i' }})
    
//     res.json(userByName)
//   } catch(err) {
//     res.json({ message : err.message })
//   }
// })

/*
Delete User Data from Database by their Id
Path Name: server/users/{ user id }
*/
router.delete('/:id', deleteUser);

/*
Edit User Data from Database by their Id
Path Name: server/users/{ user id }
*/
router.patch('/:id', editUser);

module.exports = router;