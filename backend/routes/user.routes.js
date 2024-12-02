import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar, updateUser, updatePublicProfile, getUserById, getUserStatus} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.put("/update", protectRoute, updateUser);
router.put("/update/publicprofile/:id", protectRoute, updatePublicProfile);
router.get("/:id", protectRoute, getUserById);
//*New Route to get the users online status
router.get("/status/:id", protectRoute, getUserStatus)

export default router;
