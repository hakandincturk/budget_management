import {Router} from 'express';
import UsertController from '../Controllers/User.js';
/*
 * import UserController from '../Controllers/User';
 * import checkAuth from '../Middlewares/checkAuth';
 */

const router = Router();

router.route('/').get(UsertController.all);

export default router;