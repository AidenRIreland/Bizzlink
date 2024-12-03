import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { login, logout, signup, changePassword, setupTwoFactor, verifyTwoFactor, forgotPassword,forgotPasswordWith2FA, resetPassword } from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);
// Add a new route for password change
router.post('/change-password', protectRoute, changePassword);
//!Handle 2FA Setup
router.post("/2fa/setup", protectRoute, setupTwoFactor);
router.post("/2fa/verify", verifyTwoFactor);
//Handle Password Rest
router.post("/forgot-password", forgotPassword);
router.post("/2fa/forgot-password", forgotPasswordWith2FA);
router.post("/reset-password", resetPassword);
router.post("/check-2fa", async (req, res) => {
    const { username } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({ twoFactorEnabled: user.twoFactorEnabled });
    } catch (error) {
      console.error("Error checking 2FA status:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
export default router;
