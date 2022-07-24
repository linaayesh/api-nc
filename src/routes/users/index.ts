import { Router } from 'express';

import {
  pendingUsers, approveUser, approvedUser, rejectUser, rejectedUsers,
} from '../../controllers';
import { isAdmin } from '../../middleware';

const router = Router();

// Middleware to check Admin
router.use(isAdmin);
router.get('/notApprovedUsers', pendingUsers);
router.get('/approveUser/:userId', approveUser);
router.get('/approvedUsers', approvedUser);
router.get('/rejectUser/:userId', rejectUser);
router.get('/rejectedUsers', rejectedUsers);

export default router;
