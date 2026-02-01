const mongoose = require('mongoose');
const express = require('express');
const productRouter = express.Router();
const Product = require('../models/product.model');

// GET all products
productRouter.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET product by id
productRouter.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'invalid product id'});
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new product
productRouter.post('/', async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            const products = await Product.insertMany(req.body);
            return res.status(201).json({
                message: 'Bulk products created',
                count: products.length,
                data: products
            });
        } else {
            const product = await Product.create(req.body);
            return res.status(201).json({
                message: 'single product created',
                data: product
            });
        }
    } catch (err) {
        res.status(400).json({ message: 'validation or duplication error', error: err.message });
    }
});

// PUT update product
productRouter.put('/:id', async (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'invalid product id' });
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) return res.status(404).json({ message: 'product not found'});
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: 'update failed', error: err.message });
    }
});

// DELETE product
productRouter.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'invalid product id' });
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'prodcut not found' });
        res.status(200).json({ message: 'product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = productRouter;
