import { Router } from 'express';

import { getUsers, getUser, protectedRessource, createUser } from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/protected', protectedRessource);
router.post('/', createUser);

export default router;