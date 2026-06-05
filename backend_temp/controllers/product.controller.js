import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from the database
        res.status(200).json({ success: true, data: products }); // Send the products in the response
    }
    catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body; //user will send the product data in the request body and we can access it using req.body

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export const updateProduct = async (req, res) => {
    const {id} = req.params; // Get the product ID from the URL parameters
    const product = req.body; // Get the updated product data from the request body

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product ID" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true }); // Find the product by ID and update it with the new data
        res.status(200).json({ success: true, data: updatedProduct }); // Send a success response
    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params; // Get the product ID from the URL parameters
        if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product ID" });
    }
    try{
        await Product.findByIdAndDelete(id); // Find the product by ID and delete it from the database
        res.status(200).json({ success: true, message: "Product deleted successfully" }); // Send a success response
    } catch (error) {
        console.error("Error deleting product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

