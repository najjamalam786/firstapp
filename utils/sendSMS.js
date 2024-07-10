import {} from "dotenv/config.js";
import User from "../model/userModel.js";
import Twilio from "twilio";
import { json } from "body-parser";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = Twilio(accountSid, authToken);
const sendSMS = async (toMobile, msg) => {
  let msgOption = {
    from: process.env.TWILIO_FROM_NUMBER,
    to: toMobile,
    body: msg,
  };

  try {
    await client.messages.create(msgOption);
  } catch (error) {
    console.log("error SMS");
  }
};

// get('/api/user/get-message', getMessage);
export const getMessage = async (req, res, next) => {
  try {
    res.status(200).json({ json: "Message sent" });
  } catch (error) {
    next(error);
  }
};
export const sentOTP = async (req, res, next) => {
  try {
    const OTP = randomNumber();
    console.log("OTP", OTP);
    const user = await User.findOneAndUpdate(
      { mobileNum: req.body.mobileNum },
      { verificationCode: OTP },
      { new: true }
    );

    const message = `FOOD HOUSE, Your OTP is ${OTP}. Don't share your OTP with anyone.`;
    const toMobile = req.body.mobileNum;

    sendSMS(`+91${toMobile}`, message);
    res.status(200).json({ message: "Message sent" });
  } catch (error) {
    next(error);
  }
};

const randomNumber = () => {
  // five digit random number generator
  const min = 10000;
  const max = 99999;
  const num = Math.floor(Math.random() * (max - min + 1)) + min;

  return num;
};
