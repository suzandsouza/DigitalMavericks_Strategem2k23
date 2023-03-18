const mongoose = require("mongoose");

const ImagesSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserMavericks",
  },
  faceimage: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("images", ImagesSchema);
