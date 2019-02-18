/* eslint-disable no-console */
import pool from './index';

pool.on('connect', () => {
  console.log('Connected to the database');
});

const queryText = `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        othername VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        digit VARCHAR(128) NOT NULL,
        avatar VARCHAR(128) DEFAULT 'https://www.tannerfinancial.ca/wp-content/uploads/2019/01/person-placeholder-male-5-1-300x300-250x250.jpg',
        is_admin BOOLEAN DEFAULT false,
        password VARCHAR(124) NOT NULL,
        created_at TIMESTAMP,

        modified_at TIMESTAMP DEFAULT NULL
    );

    CREATE TABLE IF NOT EXISTS parties(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) UNIQUE NOT NULL,
        hq_address TEXT NOT NULL,
        logo_url VARCHAR(128) NOT NULL,
        created_at TIMESTAMP,
        modified_at TIMESTAMP DEFAULT NULL
    );

    CREATE TABLE IF NOT EXISTS offices(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) UNIQUE NOT NULL,
        type VARCHAR(128) NOT NULL,
        created_at TIMESTAMP,
        modified_at TIMESTAMP DEFAULT NULL
    );

    CREATE TABLE IF NOT EXISTS petitions(
        id SERIAL PRIMARY KEY,
        created_by INTEGER REFERENCES users(id),
        office_id INTEGER REFERENCES offices(id),
        title VARCHAR(128) NOT NULL,
        text TEXT NOT NULL,
        evidence VARCHAR(128),
        created_at TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS candidates(
        id SERIAL,
        office_id INTEGER REFERENCES offices(id),
        party_id INTEGER REFERENCES parties(id) NOT NULL,
        user_id INTEGER REFERENCES users(id),
        PRIMARY KEY (user_id, office_id) 
    );

    CREATE TABLE IF NOT EXISTS votes(
        id SERIAL,
        office_id INTEGER REFERENCES offices(id),
        candidate_id INTEGER NOT NULL,
        voter_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP,
        PRIMARY KEY (office_id, voter_id)
    );
    `;

pool.query(queryText)
  .then((res) => {
    console.log(res);
    pool.end();
  }).catch((err) => {
    console.log(err);
    pool.end();
  });
