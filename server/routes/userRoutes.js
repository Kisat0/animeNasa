import { Router } from "express";

import { login, signup } from "../controllers/userController";

const router = Router();

router.post("/login", login);
router.post("/register", signup);

export default router;
