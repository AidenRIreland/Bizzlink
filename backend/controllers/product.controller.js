import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
    try {
        const { productName, shortDescription, price, productImage } = req.body;

        const newProduct = new Product({
            productName,
            shortDescription,
            price,
            productImage,
            userId: req.user._id,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
//? Update Product Controller
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, shortDescription, price, productImage } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { productName, shortDescription, price, productImage },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params; // Get product ID from request parameters

        // Find and delete the product by ID
        const deletedProduct = await Product.findByIdAndDelete(id);

        // If the product was not found, return a 404 error
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Return a success message
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
//? Delete Product
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getUserProducts = async (req, res) => {
    try {
        const { userId } = req.params;

        const products = await Product.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching user products:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
