
# PGcrime Developer Manual
 
## Installation

#### Getting started

Have an up-to-date version of Node.js: (https://nodejs.org/)

Clone this repository using your favorite shell

```github
git clone https://github.com/vivthai/PGcrimes.git
```


**OR** use GitHub Desktop

#### Dependencies

 Install all node dependencies inside the application directory

```npm
npm install
```

 Npm packages include:
* Express - Node.js server framework
* Sqlite, sqlite3 - SQL database backend
* Nodemon - Restart node server while coding changes
* body-parser - Node.js body parsing middleware
* ejs - Embedded JavaScript templates

## Deployment

Start the application server

```start
npm run start-watch
```
Type in your internet browser

```localhost
localhost:4000
```

## Server API

### Endpoints

#### PUT:
* PUT requests can be submitted to /api
* PUT is used to send data to our server to update our database

#### GET:
* GET requests can be retrieved from /api
* GET requestS retrieve a list of JSON objects containing PG crimes information from the database
* GET requests return a conformation string or an error message once completed

#### POST:
* POST is used to add data to our database (Data page)
* POST requests route is for form submissions (Contact Us form)
