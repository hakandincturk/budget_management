import { DataSource } from 'typeorm';

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
	logging: true,
	entities: [ '../models/entities/*.ts' ],
	migrations: [ '../migrations/*.ts' ],
	subscribers: [ '../subscribers/*.ts' ]
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
	entities: [ '../dist/entity/**/*.ts' ],
	migrations: [ '../dist/migration/**/*.ts' ],
	subscribers: [ '../dist/subscriber/**/*.ts' ]
});

const config: Config = {
	dev: devSource,
	development: developmentSource 
};

export default config;
