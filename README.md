# Politico

[![Build Status](https://travis-ci.com/despeauxz/Politico.svg?branch=develop)](https://travis-ci.com/despeauxz/Politico)
[![Coverage Status](https://coveralls.io/repos/github/despeauxz/Politico/badge.svg?branch=develop)](https://coveralls.io/github/despeauxz/Politico?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/814a9da87eef36008c63/maintainability)](https://codeclimate.com/github/despeauxz/Politico/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/814a9da87eef36008c63/test_coverage)](https://codeclimate.com/github/despeauxz/Politico/test_coverage)

Politico is an application that enables users(voters) cast their votes for their respective candidate(politicians)
## Table of Contents

* [Technologies](#technologies)
* [API Endpoints](#api-endpoints)
* [Features](#features)
* [Getting Started](#getting-started)
  * [Installation](#installation)
  * [Development](#development)
  * [Testing](#testing)
  * [License](#license)
### Pivotal Tracker
Project is built with the Project Management Tool, Pivotal Tracker. You can find the template at 
[https://www.pivotaltracker.com/n/projects/2240420](https://www.pivotaltracker.com/n/projects/2240420)

### Template
Template is hosted at [https://despeauxz.github.io/Politico/ui/index.html](https://despeauxz.github.io/Politico/ui/index.html)

## Technologies
---
- [NodeJs](https://https://nodejs.org) - Runtime Environment
- [Express](https://expressjs.com) - Web Application Framework

### Supporting Packages
#### Linter
- [ESlint](https://eslint.org) - Linter Tool
#### Compiler
- [Babel](https://babeljs.io) - Compiler for Next Generation Javascript
#### Test Tools
- [Mocha](https://mochajs.org) - JavaScript Test Framework for+ API Tests
- [Chai](https://chaijs.com) - TDD/BDD Assertion Library
- [Supertest](https://github.com/visionmedia/supertest) - Super-agent driven library for testing node.js HTTP servers
- [Istanbul](https://istanbul.js.org) - Code Coveerage Generator

# API Endpoints
| Verbs                  | Endpoint          | Functionality        |         Sample Data                               |
| ---------------------: |:----------------: | -------------------: | ------------------------------------------------: |
| POST                   | api/v1/parties    | Create Parties       |  Party `{ id: fb097bde-5959-45ff-8e21-51184fa60c25, name: AC, fullname: Action Congress, hqAddress: Abuja, logoUrl: https://placeholder.com/30, createdAt: 2019-01-31T14:34:90.000, updatedAt: 2019-01-31T14:34:90.000}`
| GET                    | api/v1/parties    | Get all parties      |  Parties: `[Array of Party Collectibles]`
| GET                    | api/v1/parties/:partyId | Get a specific party by ID | Party `{ id: fb097bde-5959-45ff-8e21-51184fa60c25, name: AC, fullname: Action Congress, hqAddress: Abuja, logoUrl: https://placeholder.com/30, createdAt: 2019-01-31T14:34:90.000, updatedAt: 2019-01-31T14:34:90.000}`
| PATCH                  | api/v1/parties/:partyId/name | Modify a specific party's name | Parties: `{ id: fb097bde-5959-45ff-8e21-51184fa60c25, name: PDP}`
| DELETE                 | api/v1/parties/:partyId | Delete an existing party | None
| POST                   | api/v1/offices          | Add a new Office | Office: `{id: fe937aa7-a7c4-4184-9e3e-ba11277a4ebb, type: Federal, name: President, createdAt: 2019-02-01T07:18:28.094, updatedAt: 2019-02-01T07:18:28.094}`
| GET                    | api/v1/offices          | Get all Offices | Offices: `[Array of Office Collectibles]`
| GET                    | api/v1/offices          | Get a specific Office by ID | Office: `{id: fe937aa7-a7c4-4184-9e3e-ba11277a4ebb, type: Federal, name: President, createdAt: 2019-02-01T07:18:28.094, updatedAt: 2019-02-01T07:18:28.094}`

## Features
---
### Admin
- Create Party
- Modify Party
- Delete Party
- Create Offices
- Politicians can aspire for a post and he can register them for an office

### Users
- Signup and Login
- Cast vote for respective candidate
- View Parties
- View offices

## Getting Started
---
#### Installation
- Install Git, NodeJs and npm on your computer
- Clone this repository using git `clone https://github.com/despeauxz/Politico.git
- Rename the `env.example` to `.env` to setup environment variables
- Run npm install to install all dependencies
- Run `npm run build` to build the project
- Run `npm start` to start the server
- Navigate to [localhost:8000](localhost:8000) in browser to access the application

#### Development
You can run `npm run dev` in development with [Nodemon](https://nodemon.io)  
Nodemon watches for changes and restarts your server

##### Testing
##### Pre-requisite
- [Postman](https://getpostman.com) - API Toolchain

##### Testing with Postman
- After installing as shown above
- Navigate to [localhost:8000](localhost:8000) in Postman to gain access to the application

### Licence
---
&copy; Malik Godwin Onimisi
License can be reached here under [MIT](https://github.com/despeauxz/Politico/blob/develop/LICENSE)
