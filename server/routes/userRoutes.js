import { Router } from "express";

import {
  getUsers,
  getUser,
  protectedRessource,
  createUser,
  checkSession,
} from "../controllers/userController";

const router = Router();

router.get('/', getUsers);
router.post('/login', getUser);
router.get('/protected', protectedRessource);
// router.get('/session', checkSession);
router.post('/', createUser);

export default router;
