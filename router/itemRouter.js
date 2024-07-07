import express from "express";
import { getWeek } from "../controller/weekController.js";
import { addItems, getItems } from "../controller/itemController.js";

const router = express.Router();

router
  .post("/add-items", addItems)
  .get("/get-items", getItems)
  .get("/week", getWeek);

export default router;
