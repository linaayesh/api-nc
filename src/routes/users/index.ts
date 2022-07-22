import { Router } from 'express';

import {
  notApprovedUsers, approveUser, approvedUser, rejectUser, rejectedUsers,
} from '../../controllers';
import { isAdmin } from '../../middleware';

const router = Router();

// Middleware to check Admin
router.use(isAdmin);
router.get('/notApprovedUsers', notApprovedUsers);
router.post('/approveUser/:userId', approveUser);
router.get('/approvedUsers', approvedUser);
router.post('/rejectUser/:userId', rejectUser);
router.get('/rejectedUsers', rejectedUsers);

export default router;
