import { Router } from 'express';

import {
  pendingUsers,
  approveUser,
  approvedUser,
  rejectUser,
  rejectedUsers,
  getPaginatedContents,
  getPaginatedUsers,
} from '../../controllers';
import {
  constants,
  validator,
  idSchema,
  getPaginatedDataSchema,
} from '../../helpers';
import { checkUserRole } from '../../middleware';

const router = Router();

const { ADMIN, MASTER_ADMIN } = constants.USER_ROLES;

router.use(checkUserRole([ADMIN, MASTER_ADMIN]));

router.get('/approved-list', approvedUser);
router.get('/rejected-list', rejectedUsers);
router.get('/waiting-list', pendingUsers);
router.get('/contents', validator.query(getPaginatedDataSchema), getPaginatedContents);
router.get('/users', validator.query(getPaginatedDataSchema), getPaginatedUsers);

router.patch('/reject/:userId', validator.params(idSchema), rejectUser);
router.patch('/approve/:userId', validator.params(idSchema), approveUser);

export default router;
