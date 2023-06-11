const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("Jobs", JobsSchema);
