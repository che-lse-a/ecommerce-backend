const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

router.post('/', protect, async (req, res) => {
  const { orderItems, totalPrice } = req.body;
  const order = new Order({ user: req.user._id, orderItems, totalPrice });
  await order.save();
  res.status(201).json(order);
});

router.get('/', protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('orderItems.product');
  res.json(orders);
});

module.exports = router;
