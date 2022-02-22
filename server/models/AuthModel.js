const mongoose = require("mongoose");
const AuthModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "offline",
  },
  last_online: {
    type: Date,
  },
});
module.exports = mongoose.model("users", AuthModel);
