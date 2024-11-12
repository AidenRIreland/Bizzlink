import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar, updateUser, getUserById, getUserStatus} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.put("/update", protectRoute, updateUser);
router.get("/:id", protectRoute, getUserById);

//*New Route to get the users online status
router.get("/status/:id", protectRoute, getUserStatus)

export default router;
