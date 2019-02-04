import pool from './index';

    const queryText =
        `DROP TABLE IF EXISTS users;
         DROP TABLE IF EXISTS parties;
         DROP TABLE IF EXISTS offices;
         DROP TABLE IF EXISTS petitions;
         DROP TABLE IF EXISTS candidates;
         DROP TABLE IF EXISTS votes;
        `;


pool.query(queryText)
    .then((res) => {
        console.log(res);
        pool.end();
    }).catch((err) => {
        console.log(err);
        pool.end();
    });

pool.on('remove', () => {
    console.log('Client removed');
    process.exit(0);
});