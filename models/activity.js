const mongoose = require('mongoose')

const ActivitySchema = mongoose.Schema({
  actName: {
    type: String,
    required: true
  },
  actDate: {
    type: Date,
    required: false,
    default: Date.now()
  },
  actCategory: {
    type: String,
    required: true
  },
  actDescription: {
    type: String,
    required: false
  },
  isCompleted:{
    type: Boolean,
    required: false,
    default: false
  },
  actUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Activity', ActivitySchema)