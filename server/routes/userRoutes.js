import { Router } from "express";

import { login, signup, refreshToken, getUserLoggedData, changeAvatar, updateUser } from "../controllers/userController";

const router = Router();

router.post("/login", login);
router.post("/register", signup);
router.put("/updateUser/:id", updateUser);
router.post("/refresh-token", refreshToken);
router.post("/me", getUserLoggedData);
router.put("/changeAvatar/:id", changeAvatar);



export default router;
