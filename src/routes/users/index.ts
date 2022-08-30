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
} from '../../controllers';
import {
  constants,
  validator,
  idSchema,
  getPaginatedDataSchema,
  createUserSchema,
  matchUserContentSchema,
  changePasswordSchema,
} from '../../helpers';
import { checkUserRole } from '../../middleware';

const router = Router();

const { ADMIN, MASTER_ADMIN, COMEDIAN } = constants.USER_ROLES;

router.use(checkUserRole([COMEDIAN, ADMIN, MASTER_ADMIN]));
router.patch('/change-password', validator.body(changePasswordSchema), changePassword);

router.use(checkUserRole([ADMIN, MASTER_ADMIN]));

router.get('/approved-list', approvedUser);
router.get('/rejected-list', rejectedUsers);
router.get('/waiting-list', pendingUsers);
router.get('/contents', validator.query(getPaginatedDataSchema), getPaginatedContents);
router.get('/users', validator.query(getPaginatedDataSchema), getPaginatedUsers);
router.get('/statistics/:userId', validator.params(idSchema), getUserStatistics);
router.post('/add-user', validator.body(createUserSchema), createUser);

router.patch('/reject/:userId', validator.params(idSchema), rejectUser);
router.patch('/approve/:userId', validator.params(idSchema), approveUser);
router.patch('/match-user-content', validator.body(matchUserContentSchema), matchUserContent);

router.use(checkUserRole([MASTER_ADMIN]));
router.patch('/block-user/:userId', validator.params(idSchema), blockUser);
export default router;
