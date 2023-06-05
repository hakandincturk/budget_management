import {Router} from 'express';
import OutgoingController from '../Controllers/Outgoing.js';

import { checkPermission } from '../../helpers/General.js';

const router = Router();

router.delete('/:id', OutgoingController.delete);
router.post('/', OutgoingController.create);
router.get('/', OutgoingController.all);
router.get('/installments/:id', OutgoingController.installments);

export default router;