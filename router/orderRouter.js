import express from "express";
import {
  createOrder,
  getOrderDetails,
  getUserOrders,
} from "../controller/orderController.js";

const router = express.Router();

router
  .post("/create-order", createOrder)
  .post("/get-user-orders", getUserOrders)
  .post("/get-order-details", getOrderDetails);

export default router;
