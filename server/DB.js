const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/chatapp",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    // console.log("CONNECTED DB");
  }
);
module.exports = mongoose;
