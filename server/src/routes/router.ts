import { Router } from "express";
import { checkAuth, logout, signIn, signUp } from "../controllers/auth";
import { updateUserProfilePic } from "../controllers/user";
import { protectRoute } from "../middleware/authMid";

const router = Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/logout", logout);

router.put("/updateUserProfilePic", protectRoute, updateUserProfilePic);
router.get("/check", protectRoute, checkAuth);

export { router };
