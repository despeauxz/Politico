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

## API Endpoints   
#### Documentation
Navigate to [https://cryptic-escarpment-28116.herokuapp.com/api/v1/docs](https://cryptic-escarpment-28116.herokuapp.com/api/v1/docs) to view Documentation
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
