import {Router} from 'express';
import InstallmentController from '../Controllers/Installment.js';

import { checkPermission } from '../../helpers/General.js';

const router = Router();

router.get('/currentMonth', InstallmentController.currentMonth);
router.get('/specificMonth/:year/:month', InstallmentController.specificMonth);
router.post('/pay', InstallmentController.pay);

export default router;