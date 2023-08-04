import pgPromise from "pg-promise";
import 'dotenv/config'

const connection = {
    host: process.env.DATABASE_HOST,
    port: 5432,
    database: 'greetings_postgresql',
    user: 'greetings_postgresql_user',
    password: process.env.DATABASE_PASSWORD,
    ssl: true

};

const db = pgPromise()(connection);
db.connect();

export default db ;