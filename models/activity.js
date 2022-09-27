const mongoose = require('mongoose')

const ActivitySchema = mongoose.Schema({
  actname: {
    type: String,
    required: true,
  },
  actdate: {
    type: Date,
    required: false,
    default: Date.now()
  },
  actcategory: {
    type: String,
    required: true,
  },
  actdescription: {
    type: String,
    required: false,
  },
  iscompleted:{
    type: Boolean,
    required: false,
    default: false,
  },
  actuser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
})

module.exports = mongoose.model('Activity', ActivitySchema)