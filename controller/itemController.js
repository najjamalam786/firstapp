import Item from "../model/itemModel.js";

// Create Items (POST) /api/item/create-items
export const addItems = async (req, res, next) => {
  const item = req.body;
  const newItem = new Item(item);
  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

// .get("/get", getItems)
// Get All Items
export const getItems = async (req, res, next) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};
