import pool from './index';


const createUsersTable = () => {
    const queryText = 
        `CREATE TABLE IF NOT EXISTS
            users(
                id UUID PRIMARY KEY,
                firstname VARCHAR(128) NOT NULL,
                lastname VARCHAR(128) NOT NULL,
                othername VARCHAR(128) NOT NULL,
                email VARCHAR(128) UNIQUE NOT NULL,
                digit VARCHAR(128) NOT NULL,
                avatar VARCHAR(128) NOT NULL,
                is_admin BOOLEAN DEFAULT false,
                created_at TIMESTAMP,
                modified_at TIMESTAMP DEFAULT NULL
            )`;

    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        }).catch((err) => {
            console.log(err);
            pool.end();
        });
};

module.exports = {
    createUsersTable,
};

require('make-runnable');
