const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema({
  when: {
    type: Date,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Jobs", MessageSchema);
