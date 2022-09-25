const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dummyDate: {
    type: Date,
    require: false,
    default: Date.now()
  },
  isCompleted: {
    type: Boolean,
    require: true,
    default: false
  }
})

module.exports = mongoose.model('User', UserSchema)