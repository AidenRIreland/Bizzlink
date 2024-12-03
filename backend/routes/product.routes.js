import express from 'express';
import { createProduct, getProducts, getUserProducts } from '../controllers/product.controller.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.post('/', protectRoute, createProduct);
router.get('/', getProducts);
router.get("/user/:userId", getUserProducts);

export default router;
