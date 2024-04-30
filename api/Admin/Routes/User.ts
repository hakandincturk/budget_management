import {Router} from 'express';
import UserController from '../Controllers/User.js';

import { checkPermission } from '../../helpers/General.js';

const router = Router();

router.use(checkPermission('super_admin'));

router.get('/', UserController.all);
router.post('/', UserController.create);
router.delete('/:id', UserController.delete);

export default router;