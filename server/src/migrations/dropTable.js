import pool from './index';

    const queryText =
        `DROP TABLE IF EXISTS users, parties, offices, petitions, candidates, votes CASCADE`;


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