import { Router } from 'express';

import {
  pendingUsers,
  approveUser,
  approvedUser,
  rejectUser,
  rejectedUsers,
  createUser,
  blockUser,
} from '../../controllers';
import {
  constants, validator, idSchema, createUserSchema,
} from '../../helpers';
import { checkUserRole } from '../../middleware';

const router = Router();

const { ADMIN, MASTER_ADMIN } = constants.USER_ROLES;

router.use(checkUserRole([ADMIN, MASTER_ADMIN]));

router.get('/approved-list', approvedUser);
router.get('/rejected-list', rejectedUsers);
router.get('/waiting-list', pendingUsers);

router.post('/add-user', validator.body(createUserSchema), createUser);

router.patch('/reject/:userId', validator.params(idSchema), rejectUser);
router.patch('/approve/:userId', validator.params(idSchema), approveUser);

router.use(checkUserRole([MASTER_ADMIN]));
router.patch('/block-user/:userId', validator.params(idSchema), blockUser);
export default router;
