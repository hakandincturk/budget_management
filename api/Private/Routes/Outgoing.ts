import {Router} from 'express';
import OutgoingController from '../Controllers/Outgoing.js';

import { checkPermission } from '../../helpers/General.js';

const router = Router();

router.use((req, res, next) => {
	next(); 
}).route('/').post(OutgoingController.create);

export default router;