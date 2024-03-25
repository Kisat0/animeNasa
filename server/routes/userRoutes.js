const express = require('express');
const router = express.Router();

import { getUsers, getUser, protectedRessource, createUser } from '../controllers/userController';

router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/protected', protectedRessource);
router.post('/', createUser);

module.exports = router;