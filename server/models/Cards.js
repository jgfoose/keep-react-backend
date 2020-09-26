const mongoose = require("mongoose");
const { Schema } = mongoose;

const cardSchema = new Schema({
  cardId: Number,
  header: String,
  color: String,
  label: String,
  items: [String],
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateCreated: Date,
  lastUpdated: Date,
});

mongoose.model("cards", cardSchema);
