import express from 'express';
import { createProduct,updateProduct,getProducts,deleteProduct, getUserProducts ,getProductById} from '../controllers/product.controller.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.post('/', protectRoute, createProduct);
router.get('/', getProducts);
router.get("/user/:userId", getUserProducts);
router.put("/:id",   protectRoute, updateProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);

export default router;
