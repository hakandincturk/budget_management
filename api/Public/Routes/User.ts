import {Router} from 'express';
import UserController from '../Controllers/User.js';

const router = Router();

router.route('/').get(UserController.all);
router.route('/').post(UserController.create);

export default router;