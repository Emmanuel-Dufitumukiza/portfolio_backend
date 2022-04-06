const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
   userId: {
       type: mongoose.Types.ObjectId,
       required: true
   },
   blogId: {
    type: mongoose.Types.ObjectId,
    required: true
   }
},{timestamps: true});

module.exports = mongoose.model("Like", likeSchema);