import { Router } from 'express';
import { requireLogin } from '../middleware/auth.js';
import { overview, sensors } from '../controller/dashboardcontroller.js';

const router = Router();

router.get('/dashboard', requireLogin, overview);
router.get('/dashboard/sensors', requireLogin, sensors);

export default router;
