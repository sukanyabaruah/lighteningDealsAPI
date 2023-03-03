const Order = require('../models/Order');


const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getCurrentUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteOrder = async(req, res) => {
try {
  await Order.findByIdAndDelete(req.params.id);
  res.status(200).json("Order has been deleted...");
} catch (err) {
  res.status(500).json(err);
}
}

module.exports = {
  createOrder,
  getCurrentUserOrders,
  getAllOrders,
  deleteOrder
}
