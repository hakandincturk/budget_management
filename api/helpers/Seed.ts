import { dataSource } from '../app.js';

export const seeder = async (tableName: string, data: Array<object>) => {
	try {
		const tableRepository = await dataSource.getRepository(tableName);
		await tableRepository.insert(data);	
	}
	catch (error) {
		console.log(error);
	}
};

export const truncate = async (tableName: string) => {
	try {
		const tableRepository = await dataSource.getRepository(tableName);
		await tableRepository.query(`TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE;`);
	}
	catch (error) {
		console.log(error);
	}
};