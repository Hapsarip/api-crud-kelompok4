const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  activity: {
    type: [Schema.Types.ObjectId],
    ref: 'Activity'
  }
})

module.exports = mongoose.model('User', UserSchema)