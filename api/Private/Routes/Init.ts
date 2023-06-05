import {Router} from 'express';
import InitController from '../Controllers/Init.js';

import { checkPermission } from '../../helpers/General.js';

const router = Router();

router.get('/dashboard', InitController.dashboard);

export default router;