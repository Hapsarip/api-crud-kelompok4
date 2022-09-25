const mongoose = require('mongoose')

const ActivitySchema = mongoose.Schema({
  actname: {
    type: String,
    required: true,
  },
  actdate: {
    type: Date,
    required: true,
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
    required: true,
    default: false,
  },
  actuser: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  }
})

module.exports = mongoose.model('Activity', ActivitySchema)