import express from 'express';
const router = express.Router();
import { createUser, verfiyUser } from '../Controller/user.controller.js';

router.post('/sign-up', createUser);
router.post('/sign-in', verfiyUser);

export default router;