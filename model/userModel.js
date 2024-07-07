import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
  },
  mobileNum: {
    type: Number,
    required: false,
    unique: false,
  },
  verificationCode: {
    type: Number,
    required: false,
    unique: true,
  },
  validUser: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: false,
  },

  userCart: {
    type: Object,
    default: {},
  },
  monthlySub: {
    success: {
      type: Boolean,
      default: false,
    },
    saveDate: {
      type: String,
    },
    expireDate: {
      type: String,
    },
  },
  userLocation: {
    type: String,
    default: "",
  },
  userOrderAddress: {
    type: Object,
    default: {},
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);
export default User;
