const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: false,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  activities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
  }]
})

UserSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTKey, {
		expiresIn: "7d",
	});
	return token;
};

UserSchema.methods.generateLogoutToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTKey, {
		expiresIn: "1s",
	});
	return token;
};

module.exports = mongoose.model('User', UserSchema)