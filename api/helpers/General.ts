import { Request, Response, NextFunction } from 'express';

class General {

	static async loggerMiddleware(request: Request, response: Response, next: NextFunction) {
		console.log(`${request.method} ${request.path}`);
		next();
	}

	static async errorHandler(nodeEnv: string, response: Response) {
		if (nodeEnv !== 'test' && nodeEnv !== 'jenkins') {
			process.on('uncaughtException', (err) => {
				console.log('Caught exception\n' + err.stack + '\n');
				const response_body = {
					type: false,
					message: 'Sistemsel bir hata oluştu, lütfen hatayı yetkililere bildiriniz.',
					error: err.message,
					stack: err.stack
				};
				if (response && !response.headersSent && !response.finished) {
					return response.status(500).json(response_body);
				}
			});
		}
	}

}

export default General;