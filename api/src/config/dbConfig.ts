import { DataSource } from 'typeorm';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Config = Record<string, DataSource>;

const devSource: DataSource = new DataSource  ({
	name: 'budget_management_dev',
	type: 'postgres',
	host: '127.0.0.1',
	port: 15432,
	username: 'hkn',
	password: '123456',
	database: 'budget_management_dev',
	synchronize: true,
	logging: false,
	entities: [ `${__dirname}/../models/entities/*.ts` ],
	migrations: [ `${__dirname}/../models/migrations/*.ts` ],
	subscribers: [ '../models/subscribers/*.ts' ]
});

const developmentSource: DataSource = new DataSource ({
	name: 'budget_management_development',
	type: 'postgres',
	host: '127.0.0.1',
	port: 15432,
	username: 'hkn',
	password: '123456',
	database: 'budget_management_development',
	synchronize: true,
	logging: true,
	entities: [ '../models/entity/**/*.ts' ],
	migrations: [ '../models/migration/**/*.ts' ],
	subscribers: [ '../models/subscriber/**/*.ts' ]
});

const config: Config = {
	dev: devSource,
	development: developmentSource 
};

export default config;
