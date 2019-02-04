import pool from './index';


const createPetitionTable = () => {
    const queryText =
        `CREATE TABLE IF NOT EXISTS
            petitions(
                id SERIAL PRIMARY KEY,
                createdOn TIMESTAMP,
                created_by UUID NOT NULL,
                office_id UUID NOT NULL,
                FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE,
                FOREIGN KEY (office_id) REFERENCES offices (id) ON DELETE CASCADE
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
    createPetitionTable,
};

require('make-runnable');
