import { Router } from 'express';

import {
  notApprovedUsers, approveUser, approvedUser, rejectUser,
} from '../../controllers';
import { isAdmin } from '../../middleware';

const router = Router();

// Middleware to check Admin
router.use(isAdmin);
router.get('/notApprovedUsers', notApprovedUsers);
router.get('/approveUser/:userId', approveUser);
router.get('/approvedUsers', approvedUser);
router.get('/rejectUser/:userId', rejectUser);

export default router;
