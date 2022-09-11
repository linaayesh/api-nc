import { Router } from 'express';

import {
  pendingUsers,
  approveUser,
  approvedUser,
  rejectUser,
  rejectedUsers,
  createUser,
  blockUser,
  getPaginatedContents,
  getPaginatedUsers,
  matchUserContent,
  changePassword,
  getUserStatistics,
  editDashboardSettings,
  getDashboardSettings,
  editProfile,
  getUserDataByID,
} from '../../controllers';
import {
  constants,
  validator,
  idSchema,
  getPaginatedDataSchema,
  createUserSchema,
  matchUserContentSchema,
  changePasswordSchema,
  editSystemSettingsSchema,
  editProfileSchema,
} from '../../helpers';
import { checkUserRole } from '../../middleware';

const router = Router();

const { ADMIN, MASTER_ADMIN, COMEDIAN } = constants.USER_ROLES;

router.use(checkUserRole([COMEDIAN, ADMIN, MASTER_ADMIN]));
router.patch('/change-password', validator.body(changePasswordSchema), changePassword);

router.get('/statistics', getUserStatistics);
router.use(checkUserRole([ADMIN, MASTER_ADMIN]));

router.get('/approved-list', approvedUser);
router.get('/rejected-list', rejectedUsers);
router.get('/waiting-list', pendingUsers);
router.get('/contents', validator.query(getPaginatedDataSchema), getPaginatedContents);
router.get('/users', validator.query(getPaginatedDataSchema), getPaginatedUsers);
router.post('/add-user', validator.body(createUserSchema), createUser);

router.patch('/reject/:userId', validator.params(idSchema), rejectUser);
router.patch('/approve/:userId', validator.params(idSchema), approveUser);
router.patch('/match-user-content', validator.body(matchUserContentSchema), matchUserContent);
router.patch('/edit-user-profile', validator.body(editProfileSchema), editProfile);

router.use(checkUserRole([MASTER_ADMIN]));
router.get('/dashboard-settings', getDashboardSettings);
router.patch('/edit-dashboard-settings', validator.body(editSystemSettingsSchema), editDashboardSettings);
router.patch('/block-user/:userId', validator.params(idSchema), blockUser);
router.get('/get-user-data/:userId', validator.params(idSchema), getUserDataByID);

export default router;
