/* eslint-disable no-console */
import pool from './index';

pool.on('connect', () => {
  console.log('Connected to the database');
});

const queryText = `CREATE TABLE IF NOT EXISTS Users(
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        othername VARCHAR(128) DEFAULT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        phoneNo VARCHAR(128) DEFAULT NULL,
        avatar VARCHAR(128) DEFAULT 'https://www.tannerfinancial.ca/wp-content/uploads/2019/01/person-placeholder-male-5-1-300x300-250x250.jpg',
        partyId INTEGER DEFAULT NULL,
        isAdmin BOOLEAN DEFAULT false,
        password VARCHAR(124) NOT NULL,
        resetPasswordToken VARCHAR(128) DEFAULT NULL,
        resetPasswordExpiry BIGINT DEFAULT NULL,
        created_at TIMESTAMP,
        modified_at TIMESTAMP DEFAULT NULL
    );

    CREATE TABLE IF NOT EXISTS Parties(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) UNIQUE NOT NULL,
        hqAddress VARCHAR(128) NOT NULL,
        fullname VARCHAR(28) NOT NULL,
        logoUrl VARCHAR(128) NOT NULL,
        created_at TIMESTAMP,
        modified_at TIMESTAMP DEFAULT NULL
    );

    CREATE TABLE IF NOT EXISTS Offices(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) UNIQUE NOT NULL,
        electionDate DATE DEFAULT NULL,
        type VARCHAR(128) NOT NULL,
        created_at TIMESTAMP,
        modified_at TIMESTAMP DEFAULT NULL
    );

    CREATE TABLE IF NOT EXISTS Petitions(
        id SERIAL PRIMARY KEY,
        created_by INTEGER REFERENCES Users(id),
        officeId INTEGER REFERENCES Offices(id),
        title VARCHAR(128) NOT NULL,
        text TEXT NOT NULL,
        evidence VARCHAR(128),
        created_at TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS Candidates(
        id SERIAL,
        confirm BOOLEAN DEFAULT false,
        officeId INTEGER REFERENCES Offices(id),
        partyId INTEGER REFERENCES Parties(id) NOT NULL,
        userId INTEGER REFERENCES Users(id),
        PRIMARY KEY (userId, officeId) 
    );

    CREATE TABLE IF NOT EXISTS Votes(
        id SERIAL,
        officeId INTEGER REFERENCES Offices(id),
        candidateId INTEGER NOT NULL,
        voterId INTEGER REFERENCES Users(id),
        created_at TIMESTAMP,
        PRIMARY KEY (officeId, voterId)
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
