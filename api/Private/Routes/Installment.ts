import {Router} from 'express';
import InstallmentController from '../Controllers/Installment.js';

import { checkPermission } from '../../helpers/General.js';

const router = Router();

router.use((req, res, next) => {
	next(); 
}).route('/currentMonth').get(InstallmentController.currentMonth);

router.use((req, res, next) => {
	next(); 
}).route('/specificMonth/:year/:month').get(InstallmentController.specificMonth);

export default router;