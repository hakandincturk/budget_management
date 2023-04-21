import { seeder, truncate } from '../../../helpers/Seed.js';

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const truncateQueue = [
	'UserRoles',
	'RolePermissions',
	'Permissions',
	'Roles',
	'UserCards',
	'Users',
	'UserTypes',
	'Outgoings',
	'Installments'
];

const seedQueue = [
	'UserTypes',
	'Users',
	'Roles',
	'Permissions',
	'RolePermissions',
	'UserRoles',
	'UserCards'
];

const runSeeder = async () => {
	console.log('Veritabanı sıfırlama ve kurma işlemi yapılıyor..');

	for (const table of truncateQueue) {
		await truncate(`${table}`);
	}

	for (const table of seedQueue) {
		console.log(' -- ', table);
		import(`${__dirname}/${table}.js`).then(async (module) => {
			await seeder(`${table}`, module.default);
		});
	}
};

await runSeeder();

export default runSeeder;