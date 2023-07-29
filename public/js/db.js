import pgPromise from "pg-promise";


const connection = {
    host: 'dpg-cj1p1d6nqqla1dibjvs0-a.oregon-postgres.render.com',
    port: 5432,
    database: 'greetings_postgresql',
    user: 'greetings_postgresql_user',
    password: 'TvueAuamk9ZUOc7UjzSUIoTbzAENDNiF',
    max: 30,
    ssl: true

};

const db = pgPromise()(connection);
db.connect();

export default db ;