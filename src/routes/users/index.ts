import { Router } from 'express';

import {
  pendingUsers,
  approveUser,
  approvedUser,
  rejectUser,
  rejectedUsers,
} from '../../controllers';
import { USER_ROLES } from '../../helpers/constants';
import { checkUserRole } from '../../middleware';

const router = Router();

router.use(checkUserRole([USER_ROLES.SYSTEM_ADMIN]));
router.patch('/reject/:userId', rejectUser);
router.patch('/approve/:userId', approveUser);
router.get('/approved-list', approvedUser);
router.get('/rejected-list', rejectedUsers);
router.get('/waiting-list', pendingUsers);

export default router;
