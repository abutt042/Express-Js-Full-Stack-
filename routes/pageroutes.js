import { Router } from 'express';
import { home, about, contact } from '../controller/pagecontroller.js';

const router = Router();

router.get('/', home);
router.get('/about', about);
router.get('/contact', contact);

export default router;
