import { Router } from 'express';

import {
  approveUser,
  pendingUsers,
  approvedUser,
  bannedUsers,
  rejectedUsers,
  rejectUser,
  blockUser,
  editDashboardSettings,
  getDashboardSettings,
  createUser,
} from '../../controllers';
import {
  constants,
  validator,
  idSchema,
  getPaginatedDataSchema,
  createUserSchema,
  editSystemSettingsSchema,
} from '../../helpers';
import { checkUserRole } from '../../middleware';

const router = Router();

const { ADMIN, MASTER_ADMIN } = constants.userRoles;

router.use(checkUserRole([ADMIN, MASTER_ADMIN]));

router.get('/approved-list', validator.query(getPaginatedDataSchema), approvedUser);
router.get('/rejected-list', validator.query(getPaginatedDataSchema), rejectedUsers);
router.get('/waiting-list', validator.query(getPaginatedDataSchema), pendingUsers);
router.get('/banned-list', validator.query(getPaginatedDataSchema), bannedUsers);

router.post('/add-user', validator.body(createUserSchema), createUser);

router.patch('/reject/:userId', validator.params(idSchema), rejectUser);
router.patch('/approve/:userId', validator.params(idSchema), approveUser);

router.use(checkUserRole([MASTER_ADMIN]));
router.get('/dashboard-settings', getDashboardSettings);
router.patch('/edit-dashboard-settings', validator.body(editSystemSettingsSchema), editDashboardSettings);
router.patch('/block-user/:userId', validator.params(idSchema), blockUser);

export default router;
