import { Pool } from 'pg';
import { config } from 'dotenv';
import configAll from '../../config/database_config';

config();
const env = process.env.NODE_ENV;
const connect = configAll[env];
// eslint-disable-next-line prefer-destructuring
const connectionString = connect.connectionString;

const pool = new Pool({
  connectionString,
});

export default pool;
