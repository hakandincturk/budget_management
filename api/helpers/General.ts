import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import md5 from 'md5';

import { dataSource } from '../app.js';
import { Users } from '../src/models/entities/Users.js';

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
			if (!req.headers['access-token'] ?? req.cookies['access-token']) {
				return res.status(401).json({type: false, message: 'Token not found'});
			}
			const token = req.headers['access-token'] ?? req.cookies['access-token'];
			if (!token) {
				return res.status(401).json({type: false, message: 'Token not found'});
			}
	
			jwt.verify(token, process.env.TOKEN_SECRET || '', async (err: any, decoded: any) =>{
				if (err) {
					return res.status(401).json({type: false, message: 'Token not found'});
				}
				else {
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
			console.log('checkPermission --> ', permName);
			const userRepo = dataSource.getRepository(Users);
			const user = await userRepo.find(
				{
					/*
					 * select: [ 
					 * 	'id',
					 * 	'name',
					 * 	'surname',
					 * 	'email',
					 * 	'phone_number',
					 * 	'createdAt',
					 * 	'updatedAt'
					 * ],
					 */
					relations: {
						userRoles: {
							role: {
								rolePermissions: {
									permission: true
								}
							}
						}
					},
					where: {
						userRoles: {
							role: {
								rolePermissions: {
									permission: {
										clean_name: permName
									}
								}
							}
						}
					},
					join: {
						alias: 'user',
						leftJoinAndSelect: {
							userRoles: 'user.userRoles',
							role: 'userRoles.role',
							rolePermissions: 'role.rolePermissions',
							permission: 'rolePermissions.permission'
						}
					}

				}
			);
			return res.json({type: false, message: 'error.message', data: user});
			next();
		}
		catch (error) {
			return res.json({type: false, message: error.message});
		}
	};
	
};