import { Router } from 'express';

import {
  pendingUsers, approveUser, approvedUser, rejectUser, rejectedUsers, editProfile,
} from '../../controllers';
import { isAdmin, isAuth } from '../../middleware';

const router = Router();

router.use(isAuth);
router.post('/edit-profile', editProfile);

// Middleware to check Admin
router.use(isAdmin);
router.get('/pendingUsers', pendingUsers);
router.get('/approveUser/:userId', approveUser);
router.get('/approvedUsers', approvedUser);
router.get('/rejectUser/:userId', rejectUser);
router.get('/rejectedUsers', rejectedUsers);

export default router;
