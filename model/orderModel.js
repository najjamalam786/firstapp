import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: false,
  },
  foodItems: {
    type: Object,
    require: false,
  },
  totalPrice: {
    type: Number,
    require: false,
  },
  orderAddress: {
    type: String,
    require: false,
  },
  locationCoordinates: {
    type: Object,
    require: false,
  },
  orderDate: {
    type: String,
  },
  orderTime: {
    type: String,
  },
  // shippingAddress: {
  //   name: {
  //     type: String,
  //     require: false,
  //   },
  //   mobileNum: {
  //     type: Number,
  //     require: false,
  //   },
  // houseNo: {
  //   type: String,
  //   require: false,
  // },
  // street: {
  //   type: String,
  //   require: false,
  // },
  // landmark: {
  //   type: String,
  //   require: false,
  // },
  // address: {
  //   type: String,
  //   require: false,
  // },
  // city: {
  //   type: String,
  //   require: false,
  // },
  // state: {
  //   type: String,
  //   require: false,
  // },
  // pinCode: {
  //   type: Number,
  //   require: false,
  // },
  // },

  paymentMethod: {
    type: String,
    default: "Cash on Delivery",
    require: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("order", orderSchema);
export default Order;
