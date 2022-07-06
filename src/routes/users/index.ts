import { Router } from 'express';

import { notApprovedUsers, approveUser } from '../../controllers';

const router = Router();

router.get('/notApprovedUsers', notApprovedUsers);
router.get('/approveUser/:userId', approveUser);

export default router;
