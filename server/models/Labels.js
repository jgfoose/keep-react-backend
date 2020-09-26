const mongoose = require("mongoose");
const { Schema } = mongoose;

const labelSchema = new Schema({
  label: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("labels", labelSchema);
