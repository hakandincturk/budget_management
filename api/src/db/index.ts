import dbConfig from '../config/dbConfig.js';

const nodeEnv = process.env.NODE_ENV || 'dev';

const AppDataSource = dbConfig[nodeEnv];
const dataSource = await AppDataSource.initialize();
console.log(`postgres connected to ${dataSource.options.database}`);

export default dataSource;