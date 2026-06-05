//entry point of the api
// traditional way const express = require('express');
// modern way
import express from 'express'; 
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import routes from './routes/product.route.js';
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Use the PORT from environment variables or default to 5000
const __dirname = path.resolve();
app.use(express.json()); //middleware to parse/accept json data from the request body`

app.use("/api/products", routes); // Use the product routes for handling requests to /api/products

if(process.env.NODE_ENV === "production"){
    app.use (express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "idex.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);
});

