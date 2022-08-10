import { Router } from 'express';

import {
  pendingUsers,
  approveUser,
  approvedUser,
  rejectUser,
  rejectedUsers,
} from '../../controllers';
import { constants, validator, idSchema } from '../../helpers';
import { checkUserRole } from '../../middleware';

const router = Router();

const { SYSTEM_ADMIN } = constants.USER_ROLES;

router.use(checkUserRole([SYSTEM_ADMIN]));

router.get('/approved-list', approvedUser);
router.get('/rejected-list', rejectedUsers);
router.get('/waiting-list', pendingUsers);

router.patch('/reject/:userId', validator.params(idSchema), rejectUser);
router.patch('/approve/:userId', validator.params(idSchema), approveUser);

export default router;
