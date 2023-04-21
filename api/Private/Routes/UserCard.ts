import {Router} from 'express';
import UserCardController from '../Controllers/UserCard.js';

import { checkPermission } from '../../helpers/General.js';

const router = Router();

router.use((req, res, next) => {
	next(); 
}).route('/').get(UserCardController.all);

router.use((req, res, next) => {
	next(); 
}).route('/').post(UserCardController.create);

router.use((req, res, next) => {
	next(); 
}).route('/:card_id').delete(UserCardController.delete);

export default router;