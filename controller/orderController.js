import Order from "../model/orderModel.js";
import User from "../model/userModel.js";

// Create a new order (POST) /api/order/create-order
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      user: req.body.userId,
      foodItems: req.body.foodItems,
      totalPrice: req.body.totalPrice,
      orderAddress: req.body.orderAddress,
      locationCoordinates: req.body.locationCoordinates,
      orderDate: new Date().toDateString(),
      orderTime: new Date().toLocaleTimeString(),
    });

    if (order) {
      await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { orders: order._id }, userCart: [] },
        { new: true }
      );
      res.status(201).json(order);
    }
  } catch (error) {
    res.status(402).json({ error: error.message });
  }
};

// get all orders (GET) /api/order/get-user-orders
export const getUserOrders = async (req, res) => {
  const { userId } = req.body;
  try {
    const orders = await Order.find({ user: userId });
    res.status(201).json(orders);
  } catch (error) {
    res.status(402).json({ error: error.message });
  }
};

// get order details (GET) /api/order/get-order-details
export const getOrderDetails = async (req, res) => {
  const { _id } = req.body;
  try {
    const order = await Order.findById(_id);
    res.status(201).json(order);
  } catch (error) {
    res.status(402).json({ error: error.message });
  }
};
