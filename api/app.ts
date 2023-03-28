/* eslint-disable @typescript-eslint/no-var-requires */
import bodyParser from 'body-parser';
import dotEnv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import { pagination } from 'typeorm-pagination';

import dbConfig from './src/config/dbConfig';
import swaggerOptions  from './src/config/swaggerOptions';

const app: Application = express();

dotEnv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pagination);

const nodeEnv = process.env.NODE_ENV || 'dev';

const AppDataSource = dbConfig[nodeEnv];

AppDataSource.initialize().then((conn) => {
	console.log(`Database connection is established ${conn.options.database}`);
});

const expressSwagger = require('express-swagger-generator')(app);
expressSwagger(swaggerOptions);

const PORT: number = Number(process.env.PORT) || 7000;

app.get('/health', (req: Request, res: Response) => {
	return res.json({type: true, message: 'Deployment is running'});
});
app.listen(PORT, function () {
	console.log(`SERVER LISTENING ON ${PORT}`);
});

export default app;