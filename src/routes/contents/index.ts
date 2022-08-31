import { Router } from 'express';

import {
  getPaginatedContents,
  matchUserContent,
} from '../../controllers';
import {
  constants,
  validator,
  getPaginatedDataSchema,
  matchUserContentSchema,
} from '../../helpers';
import { checkUserRole } from '../../middleware';

const router = Router();

const { ADMIN, MASTER_ADMIN } = constants.USER_ROLES;

router.use(checkUserRole([ADMIN, MASTER_ADMIN]));

router.get('/contents', validator.query(getPaginatedDataSchema), getPaginatedContents);
router.patch('/match-user-content', validator.body(matchUserContentSchema), matchUserContent);

export default router;
