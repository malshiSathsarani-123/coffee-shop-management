const CoffeeProduct = require('../model/coffeeProduct');
const path = require('path');

// Create a new CoffeeProduct
const createCoffeeProduct = async (req, res) => {
    try {
        const { name, price, category, subCategory, discount = 0, isTopChoice = false } = req.body;
        const image = req.file ? req.file.path : null; 

        if (!name || !price || !category || !image) {
            return res.status(400).json({ error: "Name, price, image, category and subCategory are required." });
        }

        const lastProduct = await CoffeeProduct.findOne({}, {}, { sort: { id: -1 } });
        let newId = "CP001";

        if (lastProduct) {
            const lastIdNum = parseInt(lastProduct.id.slice(2), 10); 
            const nextIdNum = lastIdNum + 1;
            newId = `CP${nextIdNum.toString().padStart(3, '0')}`;
        }

        const newCoffeeProduct = new CoffeeProduct({
            id: newId,
            name,
            price,
            category,
            subCategory,
            image, 
            discount,
            isTopChoice
        });

        const savedProduct = await newCoffeeProduct.save();
        res.status(201).json({ message: "Product created successfully", product: savedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all CoffeeProducts
const getCoffeeProducts = async (req, res) => {
    try {
        const response = await CoffeeProduct.find();
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {}; 
        const response = await CoffeeProduct.find(filter);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductsBySubCategory = async (req, res) => {
    try {
        const { subCategory } = req.query;
        const filter = subCategory ? { subCategory } : {}; 
        const response = await CoffeeProduct.find(filter);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await CoffeeProduct.findOne({ id: id }); 

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "Server error" });
    }
};

// Update CoffeeProduct
const updateCoffeeProduct = async (req, res) => {
    try {
        const { id, name, price, qty } = req.body;
        const updateFields = { name, price, qty };

        if (req.file) {
            updateFields.image = req.file.path; // Only update image if a new file is uploaded
        }

        await CoffeeProduct.updateOne({ id: id }, { $set: updateFields });

        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete CoffeeProduct
const deleteCoffeeProduct = async (req, res) => {
    try {
    
        const { id } = req.params; 
        const product = await CoffeeProduct.findOne({ id: id });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const response = await CoffeeProduct.deleteOne({ id });
        res.json({ message: "Product deleted successfully", response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCoffeeProduct = createCoffeeProduct;
exports.getCoffeeProducts = getCoffeeProducts;
exports.getProductsByCategory = getProductsByCategory;
exports.getProductById = getProductById;
exports.getProductsBySubCategory = getProductsBySubCategory;
exports.updateCoffeeProduct = updateCoffeeProduct;
exports.deleteCoffeeProduct = deleteCoffeeProduct;
