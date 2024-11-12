import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { login, logout, signup, changePassword } from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);
// Add a new route for password change
router.post('/change-password', protectRoute, changePassword);

export default router;
