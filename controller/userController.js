import { response } from "express";
import User from "../model/userModel.js";

// Create a new user (POST) /api/user/verify_phone
export const createUser = async (req, res) => {
  try {
    const { mobileNum } = req.body;

    const existingUser = await User.findOne({ mobileNum });
    if (existingUser) {
      return res.status(201).json(existingUser);
    } else {
      const user = await User.create({ mobileNum });
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(402).json({ error: error.message });
  }
};

// Verify OTP (POST) /api/user/verify_otp
export const verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await User.findOne({ verificationCode: otp });
    if (user) {
      return res.status(201).json(user);
    } else {
      return res.status(201).json(false);
    }
  } catch (error) {
    res.status(402).json({ error: error.message });
  }
};

// Validate user [logIn, logOut] (POST) /api/user/validate
export const validateUser = async (req, res) => {
  try {
    const { _id, validUser } = req.body;
    const user = await User.findOneAndUpdate(
      { _id },
      { validUser },
      { new: true }
    );
    if (user) {
      return res.status(201).json(true);
    } else {
      return res.status(201).json(false);
    }
  } catch (error) {
    res.status(402).json({ error: error.message });
  }
};

// Get User Details (GET) /api/user/get-user
export const getUser = async (req, res) => {
  const { _id } = req.body;
  try {
    const user = await User.findOne({ _id });
    res.status(201).json(user);
  } catch (error) {
    res.status(402).json({ error: error.message });
  }
};

// Add to cart (POST) /api/user/add-to-cart

export const addItemToCart = async (req, res, next) => {
  const cartData = req.body;
  try {
    await User.findOneAndUpdate(
      { _id: cartData.userId },
      { $push: { userCart: cartData.userCart } },
      { new: true }
    ).then(async (response) => {
      if (response === null) {
        res.status(200).json(response);
      } else {
        res.status(200).json(response.userCart);
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update user cart (POST) /api/user/update-cart
export const updateUserCart = async (req, res, next) => {
  const cartData = req.body;

  try {
    const response = await User.findOneAndUpdate(
      {
        _id: cartData.userId,
        "userCart._id": cartData._id,
      },
      { $set: { "userCart.$.quantity": cartData.quantity } },
      { new: true }
    );

    res.status(200).json(response.userCart);
  } catch (error) {
    next(error);
  }
};

// Get user cart (GET) /api/user/get-cart
export const getUserCart = async (req, res, next) => {
  const { userId } = req.body;
  try {
    await User.findOne({ _id: userId }).then((response) => {
      if (response.userCart.length === 0) {
        res.status(200).json(null);
      } else {
        res.status(200).json(response.userCart);
      }
    });
  } catch (error) {
    next(error);
  }
};

// Delete user cart (POST) /api/user/delete-cart-items
export const deleteUserCartItems = async (req, res, next) => {
  const cartData = req.body;
  // const query = { _id: cartData.userId };

  // const updateDocument = {
  //   $pull: { userCart: { _id: cartData._id } },
  // };

  try {
    await User.findOneAndUpdate(
      { _id: cartData.userId, "userCart._id": cartData._id },
      { $pull: { userCart: { _id: cartData._id } } }
    ).then(async () => {
      await User.findOne({ _id: cartData.userId }).then((response) => {
        if (response.userCart) {
          res.status(200).json(response.userCart);
        } else {
          res.status(200).json(null);
        }
      });
    });
  } catch (error) {
    next(error);
  }
};

// Delete Cart Items if "cart" is empty (POST) /api/user/delete-cart
export const deleteCartItems = async (req, res, next) => {
  const orderData = req.body;
  try {
    await User.findOneAndUpdate(
      { email: orderData.email },
      { $set: { userCart: [] } },
      { new: true }
    ).then(() => {
      res.json("Cart is empty");
    });
  } catch (error) {
    next(error);
  }
};
