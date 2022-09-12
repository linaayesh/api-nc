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
  getPaginatedUsers,
  editProfile,
} from '../../controllers';
import {
  constants,
  validator,
  idSchema,
  getPaginatedDataSchema,
  createUserSchema,
  editSystemSettingsSchema,
  editProfileSchema,
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

router.patch('/edit-user-profile', validator.body(editProfileSchema), editProfile);

router.patch('/reject/:userId', validator.params(idSchema), rejectUser);
router.patch('/approve/:userId', validator.params(idSchema), approveUser);

router.get('/users', validator.body(getPaginatedDataSchema), getPaginatedUsers);

router.use(checkUserRole([MASTER_ADMIN]));
router.get('/dashboard-settings', getDashboardSettings);
router.patch('/edit-dashboard-settings', validator.body(editSystemSettingsSchema), editDashboardSettings);
router.patch('/block-user/:userId', validator.params(idSchema), blockUser);

export default router;
