import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import md5 from 'md5';

import { dataSource } from '../app.js';
import { Users } from '../src/models/entities/Users.js';
import { Lang } from '../src/config/enums.js';

export const loggerMiddleware = (request: Request, response: Response, next: NextFunction) => {
	console.log(`${request.method} ${request.path}`);
	next();
};

export const errorHandler = async (nodeEnv: string, response: Response) => {
	if (nodeEnv !== 'test' && nodeEnv !== 'jenkins') {
		process.setMaxListeners(10);
		process.on('uncaughtException', (err) => {
			console.log('Caught exception\n' + err.stack + '\n');
			const response_body = {
				type: false,
				message: 'Sistemsel bir hata oluştu, lütfen hatayı yetkililere bildiriniz.',
				error: err.message,
				stack: err.stack
			};
				
			if (response && !response.headersSent) {
				return response.status(500).json(response_body);
			}
		});
	}
};

export const generateUUID = () => {
	return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		const r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
};

export const encryptPassword = (password: string) => {
	const passwordSalt: string = process.env.PASSWORD_SALT || '';
	return md5(md5(password) + md5(passwordSalt));
};

export const checkToken = () => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const language = req.headers.language?.toString() || 'tr';
			if (!req.headers['access-token'] ?? req.cookies['access-token']) {
				return res.status(401).json({type: false, message: Lang[language].Auth.error.tokenNotFound});
			}
			const token = req.headers['access-token'] ?? req.cookies['access-token'];
			if (!token) {
				return res.status(401).json({type: false, message: Lang[language].Auth.error.tokenNotFound});
			}
	
			jwt.verify(token, process.env.TOKEN_SECRET || '', async (err: any, decoded: any) =>{
				if (err) {
					return res.status(401).json({type: false, message: Lang[language].Auth.error.tokenNotFound});
				}
				else {
					req.decoded = {
						id: Number(decoded.user_id)
					};
					next();
				}
			});
		}
		catch (error) {
			return res.json({type: false, message: error.message});
		}
	};
};

export const checkPermission = (permName: string) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const language = req.headers.language?.toString() || 'tr';
			const userRepo = dataSource.getRepository(Users);
			const user = await userRepo.createQueryBuilder('user')
				.innerJoin('user.userRoles', 'userRoles')
				.innerJoin('userRoles.role', 'role')
				.innerJoin('role.rolePermissions', 'rolePermissions')
				.innerJoin('rolePermissions.permission', 'permission')
				.where('permission.clean_name = :permName', {permName})
				.andWhere('user.id = :userId', {userId: req.decoded.id})
				.select([
					'user.id',
					'user.name',
					'user.surname',
					'user.email',
					'userRoles.id',
					'role.name',
					'role.clean_name',
					'rolePermissions.id',
					'permission.name',
					'permission.clean_name'
				])
				.getOne();
			if (!user) {
				return res.status(401).json({type: false, message: Lang[language].Auth.error.unauthorizedLogin});
			}

			next();
		}
		catch (error) {
			return res.json({type: false, message: error.message});
		}
	};
	
};