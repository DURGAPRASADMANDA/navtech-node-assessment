# navtech-node-assessment
Nav Tech Node JS Assessment

This is Order Management System NODE Repo — with USER and ORDERS modules!
# Use Authorization for all APIs except signup and login

- To get Authorization token singup and login
- After login, it gives you Authorization token
- Pass this Authorization in headers for all order APIs
- FYI - POSTMAN COLLECTION JSON in `public/assets` folder
---
# Getting started

To get the Node server running locally:

- Clone this repo
- `git clone https://github.com/DURGAPRASADMANDA/navtech-node-assessment.git`
- Navigate to the root folder
- Run `npm i` to install all required dependencies
- Run `npm audit fix` if you find any vulnerabilities
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `npm start` to start the local server([In Browser](https://localhost:3000))
- POSTMAN JSON file added in the following path `navtech-node-assessment/public/assets/navtech.postman_collection.json`
- Import postman JSON and play around with the `navtech-node-assessment` node app

---

# Code Overview

## Dependencies

- [expressjs](https://www.npmjs.com/package/express) - The server for handling and routing HTTP requests
- [jwt-simple](https://www.npmjs.com/package/jwt-simple) - Middleware for validating JWTs for authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript

## Application Structure

- `bin/www` - Server start file consists create server and port defined
- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `common/enums/` - This file contains configuration/environment variables.
- `common/common/` - This file contains commonly used methods across the project.
- `models/` - This folder contains mongoose schemas and mongodb connection.
- `public/assets/` - This file contains POSTMAN JSON to test the APIswith pre loaded payloads.
- `src/` - This folder contains User and Orders services(Router, Service and Controller).
- `views/` - This folder contains pug to load html base page - to check server status.

## Logging

- Custom logger can be implemented