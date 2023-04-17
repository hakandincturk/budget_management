import {Router} from 'express';
import UserCardController from '../Controllers/UserCards.js';

import { checkPermission } from '../../helpers/General.js';

const router = Router();

router.use((req, res, next) => {
	next(); 
}).route('/').get(UserCardController.all);

export default router;