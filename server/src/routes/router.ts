import { Router } from "express";

import { checkAuth, logout, signIn, signUp } from "../controllers/auth";
import { getMessages, sendMessage } from "../controllers/message";
import { updateUserProfilePic } from "../controllers/profile";
import { getUsers } from "../controllers/user";
import { protectRoute } from "../middleware/authMid";

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
