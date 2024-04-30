import {Router} from 'express';
import UserCardController from '../Controllers/UserCard.js';

import { checkPermission } from '../../helpers/General.js';

const router = Router();

router.get('/', UserCardController.all);
router.post('/', UserCardController.create);
router.delete('/:card_id', UserCardController.delete);

export default router;