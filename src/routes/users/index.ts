import { Router } from 'express';

import { notApprovedUsers, approveUser } from '../../controllers';
import { isAdmin } from '../../middleware';

const router = Router();

// Middleware to check Admin
router.use(isAdmin);
router.get('/notApprovedUsers', notApprovedUsers);
router.get('/approveUser/:userId', approveUser);

export default router;
