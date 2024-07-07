import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  week: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  foodType: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  pieces: {
    type: Number,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
});

const Item = mongoose.model("Item", itemSchema);
export default Item;
