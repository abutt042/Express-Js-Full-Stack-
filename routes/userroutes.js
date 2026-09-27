import { Router } from 'express';
import { requireLogin } from '../middleware/auth.js';
import { createUser, deleteuser, listUsers, sendmail } from '../controller/usercontroller.js';
import upload from '../middleware/multerconfig.js';

const router = Router();

router.get('/users', requireLogin, listUsers);
router.post('/createuser', requireLogin, upload.single('profileImage'), createUser);
router.delete('/user/:id', requireLogin, deleteuser);
router.post('/sendmail', requireLogin , sendmail)

export default router;
