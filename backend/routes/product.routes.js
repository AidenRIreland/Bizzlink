import express from 'express';
import { createProduct, getProducts,updateProduct,deleteProduct, getUserProducts ,getProductById} from '../controllers/product.controller.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.post('/', protectRoute, createProduct);
router.get('/', getProducts);
router.get("/user/:userId", getUserProducts);
//TODO:Figure out why edit isnt working
router.put("/:id",   protectRoute, updateProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);

export default router;
