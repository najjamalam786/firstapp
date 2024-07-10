import express from "express";
import {
  addItemToCart,
  createUser,
  deleteCartItems,
  deleteUserCartItems,
  getUser,
  getUserCart,
  updateUserCart,
  validateUser,
  verifyOTP,
} from "../controller/userController.js";
import { sentOTP } from "../utils/sendSMS.js";
const router = express.Router();

router
  .post("/get-user", getUser)
  .post("/verify_phone", createUser)
  .post("/message", sentOTP)
  .post("/verify_otp", verifyOTP)
  .post("/validate", validateUser)
  .post("/add-to-cart", addItemToCart)
  .post("/update-cart", updateUserCart)
  .post("/get-cart", getUserCart)
  .post("/delete-cart-item", deleteUserCartItems)
  .post("/delete-cart", deleteCartItems);

export default router;
