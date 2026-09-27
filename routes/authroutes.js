import { Router } from 'express';
import { showLogin, login, logout } from '../controller/authcontroller.js';

const router = Router();

router.get('/login', showLogin);
router.post('/login', login);
router.get('/logout', logout);

export default router;
