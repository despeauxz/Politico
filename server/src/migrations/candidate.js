import pool from './index';


const createCandidatesTable = () => {
    const queryText =
        `CREATE TABLE IF NOT EXISTS
            candidates(
                id SERIAL PRIMARY KEY,
                confirm BOOLEAN DEFAULT false,
                office_id UUID NOT NULL,
                party_id UUID NOT NULL,
                candidate_id UUID NOT NULL,
                FOREIGN KEY (office_id) REFERENCES offices (id) ON DELETE CASCADE,
                FOREIGN KEY (party_id) REFERENCES parties (id) ON DELETE CASCADE,
                FOREIGN KEY (candidate_id) REFERENCES users (id) ON DELETE CASCADE
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
    createCandidatesTable,
};

require('make-runnable');
