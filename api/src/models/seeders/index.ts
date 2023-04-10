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
	'Users'
];

const seedQueue = [
	'Users'
	/*
	 * 'Roles',
	 * 'Permissions',
	 * 'RolePermissions',
	 * 'UserRoles'
	 */
];

const runSeeder = async () => {
	console.log('Veritabanı sıfırlama ve kurma işlemi yapılıyor..');

	for (const table of truncateQueue) {
		truncate(`${table}`);
	}

	for (const table of seedQueue) {
		console.log(table);
		import(`${__dirname}/${table}.js`).then(module => {
			seeder(`${table}`, module.default);
		});
	}
};

await runSeeder();

export default runSeeder;