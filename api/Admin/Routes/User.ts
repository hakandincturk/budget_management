import {Router} from 'express';
import UserController from '../Controllers/User.js';

import { checkPermission } from '../../helpers/General.js';

const router = Router();

router.use(checkPermission('super_admin')).route('/').get(UserController.all);
router.route('/').post(UserController.create);

export default router;