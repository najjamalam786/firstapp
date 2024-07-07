import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRouter from "./router/userRouter.js";
import itemRouter from "./router/itemRouter.js";
import orderRouter from "./router/orderRouter.js";
// import path from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/user", userRouter);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_DB)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server and DataBase running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error));

// endpoint to get all users
