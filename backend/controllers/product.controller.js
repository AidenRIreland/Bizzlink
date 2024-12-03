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
