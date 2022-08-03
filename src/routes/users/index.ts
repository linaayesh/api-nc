import { Router } from 'express';

import {
  pendingUsers,
  approveUser,
  approvedUser,
  rejectUser,
  rejectedUsers,
  addFinancialInformation,
  editFinancialInformation,
  getFinancialInformation,
} from '../../controllers';
import { isAdmin, isAuth } from '../../middleware';

const router = Router();

router.use(isAuth);
<<<<<<< HEAD
router.route('/financial-information').post(addFinancialInformation).patch(editFinancialInformation).get(getFinancialInformation);
=======
>>>>>>> d3e33f80fbaf1c533fd515315da3e8c4838e1791

// Middleware to check Admin
router.use(isAdmin);
router.get('/waiting-list', pendingUsers);
router.patch('/approve/:userId', approveUser);
router.get('/approved-list', approvedUser);
router.patch('/reject/:userId', rejectUser);
router.get('/rejected-list', rejectedUsers);

export default router;
