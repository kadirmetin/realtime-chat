import express from "express";
import { logout, signIn, signUp } from "../controllers/auth";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/logout", logout);

export { router };
