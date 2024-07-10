import express from "express";
import { addWeek } from "../controller/weekController.js";
import { addItems, getItems } from "../controller/itemController.js";

const router = express.Router();

router
  .post("/add-items", addItems)
  .get("/get-items", getItems)
  .post("/add-week", addWeek);
// .get("/week", getWeek);

export default router;
