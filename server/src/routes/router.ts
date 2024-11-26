import { Router } from "express";
import { checkAuth, logout, signIn, signUp } from "../controllers/auth.js";
import { getMessages, sendMessage } from "../controllers/message.js";
import { updateUserProfilePic } from "../controllers/profile.js";
import { getUsers } from "../controllers/user.js";
import { protectRoute } from "../middleware/authMid.js";

const router = Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/logout", logout);
router.get("/auth/check", protectRoute, checkAuth);

router.put("/updateUserProfilePic", protectRoute, updateUserProfilePic);

router.get("/users", protectRoute, getUsers);

router.get("/messages/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export { router };
