import {Router} from 'express';
import AuthController from '../Controllers/Auth.js';

const router = Router();

router.route('/login').post(AuthController.login);

export default router;