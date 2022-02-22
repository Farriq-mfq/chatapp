const mongoose = require("mongoose");

const MessageModel = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  id_penerima: {
    type: String,
    required: true,
  },
  id_pengirim: {
    type: String,
    required: true,
  },
  is_read: {
    type: Boolean,
  },
  date: {
    type: Date,
  },
});
module.exports = mongoose.model("message", MessageModel);
