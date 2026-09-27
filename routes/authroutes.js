import { Router } from 'express';
import { showLogin, showSignup, login, logout } from '../controller/authcontroller.js';
import { signupuser } from '../controller/usercontroller.js';
import upload from '../middleware/multerconfig.js';

const router = Router();

router.get('/login', showLogin);
router.get('/signup', showSignup);
router.post('/login', login);
router.post('/signup', upload.single('profileImage'), signupuser);
router.get('/logout', logout);

export default router;
