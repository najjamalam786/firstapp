import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRouter from "./router/userRouter.js";
import itemRouter from "./router/itemRouter.js";
import orderRouter from "./router/orderRouter.js";
import User from "./model/userModel.js";
import Item from "./model/itemModel.js";
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

// app.get("/", async (req, res) => {
//   const items = await Item.find();
//   res.send(items);

// res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

// app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.static("client/build"));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server and DataBase running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error));

// endpoint to get all users
