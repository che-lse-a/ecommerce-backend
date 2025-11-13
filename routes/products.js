const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

// get all products
router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// create product (admin) - simple open endpoint for demo; protect in production
router.post('/', protect, async (req, res) => {
  const p = new Product(req.body);
  await p.save();
  res.status(201).json(p);
});

// get single
router.get('/:id', async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Product not found' });
  res.json(p);
});

module.exports = router;
