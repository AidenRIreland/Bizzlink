import express from 'express';
import { createProduct, getProducts,updateProduct,deleteProduct, getUserProducts } from '../controllers/product.controller.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.post('/', protectRoute, createProduct);
router.get('/', getProducts);
router.get("/user/:userId", getUserProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
