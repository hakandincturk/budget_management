/* eslint-disable @typescript-eslint/no-var-requires */
import bodyParser from 'body-parser';
import dotEnv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import { pagination } from 'typeorm-pagination';

import expressJSDOCSwagger from 'express-jsdoc-swagger';

import dbConfig from './src/config/dbConfig.js';
import swaggerOptions  from './src/config/swaggerOptions.js';

const PORT: number = Number(process.env.PORT) || 7000;
const app: Application = express();

dotEnv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pagination);

const nodeEnv = process.env.NODE_ENV || 'dev';

const AppDataSource = dbConfig[nodeEnv];

const dataSource = await AppDataSource.initialize();
console.log(`Database connection is established ${dataSource.options.database}`);

expressJSDOCSwagger(app)(swaggerOptions);

app.get('/health', (req: Request, res: Response) => {
	return res.json({type: true, message: 'Deployment is running'});
});
app.listen(PORT, function () {
	console.log(`SERVER LISTENING ON ${PORT}`);
});

export default app;