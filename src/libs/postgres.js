import k from 'knex';
import pg from 'pg-promise';
import sql from 'sql-template-strings';

// dotenv is called before this
const connection = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: true,
};

// Allows Promises for PostgreSQL
const pgp = pg();
// Create database object
const db = pgp(connection);
// Create object for query builder
// knex is not really being used right now, might be removed
const knex = k({ client: 'pg', connection });

export { db, knex, pgp, sql };
