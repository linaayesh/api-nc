import { Router } from 'express';

import { notApprovedUsers, approveUser, approvedUser } from '../../controllers';
import { isAdmin } from '../../middleware';

const router = Router();

// Middleware to check Admin
router.use(isAdmin);
router.get('/notApprovedUsers', notApprovedUsers);
router.get('/approveUser/:userId', approveUser);
router.get('/approvedUsers', approvedUser);

export default router;
