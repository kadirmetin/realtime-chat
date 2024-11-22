import { Router } from "express";
import { logout, signIn, signUp } from "../controllers/auth";

const router = Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/logout", logout);

export { router };
