import express from 'express'

import { getProducts, createProduct, updateProduct, deleteProduct} from '../controllers/product.controller.js';


const router = express.Router();

export default router;

router.post("/", createProduct); // Create a new product

//Postman desktop application used to test with no frontend

router.delete("/:id", deleteProduct); // Delete a product by ID

router.get("/" , getProducts); // Get all products

router.put("/:id", updateProduct); // Update a product by ID
