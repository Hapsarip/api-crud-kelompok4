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
  },
  activity: {
    type: [Schema.Types.ObjectId],
    ref: 'Activity'
  },
  
  //dummy atribut untuk coba2
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