/* eslint-disable @typescript-eslint/no-var-requires */
import bodyParser from 'body-parser';
import dotEnv from 'dotenv';
import express, { Application, NextFunction, Request, Response, response } from 'express';
import { pagination } from 'typeorm-pagination';

import GeneralHelper from './helpers/General.js';

import expressJSDOCSwagger from 'express-jsdoc-swagger';

import dbConfig from './src/config/dbConfig.js';
import swaggerOptions  from './src/config/swaggerOptions.js';

import publicRoutes from './Public/index.js';

const PORT: number = Number(process.env.PORT) || 7000;
const app: Application = express();

dotEnv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pagination);
app.use((req: Request, res: Response, next: NextFunction) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});

const nodeEnv = process.env.NODE_ENV || 'dev';
console.log(`this is the environment: ${nodeEnv}`);

let requestResponse: Response = response;
app.use((req: Request, res: Response, next: NextFunction) => {
	requestResponse = res;
	GeneralHelper.errorHandler(nodeEnv, requestResponse);
	next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
	req.headers.language = req.headers.language || 'tr';
	next();
});

const AppDataSource = dbConfig[nodeEnv];
const dataSource = await AppDataSource.initialize();
console.log(`postgres connected to ${dataSource.options.database}`);

expressJSDOCSwagger(app)(swaggerOptions);

app.use(GeneralHelper.loggerMiddleware);
app.use('/', publicRoutes);

app.get('/health', (req: Request, res: Response) => {
	return res.json({type: true, message: 'Deployment is running'});
});
app.listen(PORT, function () {
	console.log(`SERVER LISTENING ON ${PORT}`);
});
export {dataSource};
export default app;