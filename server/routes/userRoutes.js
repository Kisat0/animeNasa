import { Router } from "express";

import { login, signup, refreshToken, getUserLoggedData } from "../controllers/userController";

const router = Router();

router.post("/login", login);
router.post("/register", signup);
router.post("/refresh-token", refreshToken);
router.post("/me", getUserLoggedData);

export default router;
