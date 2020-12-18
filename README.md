# PGcrime

Application by Team3: Vivian Thai, Chopa Zamir, Yao Poudima, Yuming Huang, Audrey Tsang

PGcrime is a web-based application created by University of Maryland students, designed to solve the lack in accessible information the Prince George's County general public has on their communities.

With PGcrime, users can see navigate accurate and organized PG County crime via the search and data functionality.

 # PGcrime Heroku Site
 
 
 # Supported Browsers
 * Google Chrome for Desktop and Mobile
 * iOS Safari for Desktop and Mobile
 
 
 # Manual Links
 [User Manual](https://github.com/vivthai/PGcrimes/blob/main/docs/usermanual.md)
 
 [Developer Manual](https://github.com/vivthai/PGcrimes/blob/main/developermanual.md)

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
* Bulma - CSS framework
* Express - Node.js server framework
* Mocha - JavaScript test framework
* Sqlite, sqlite3 - SQL database backend
* Babel - Access ES6+ JavaScript features
* Node-fetch - Access fetch API
* Nodemon - Restart node server while coding changes
* Flatpickr - Datetime picker
* Heatmap.js, leaflet-heatmap - Leaflet heatmap plugin
* Autoprefixer, node-sass, postcss-cli - Edit and save Sass files
* Npm-run-all - Run multiple npm scripts

## Deployment

Start the application server

```start
npm start
```

## Testing 

In the main repository directory:

```test
npm test
```

## Server API

### Endpoints
#### PUT:
* PUT request route is for form submissions (Contact Us!)
* PUT requests can be submitted to /api
* PUT request must be in json form and conform to the parameters set by the database (for the form)
* PUT requests return a conformation string or an error message once completed

#### GET:
* GET requests can be retrieved from /api
* GET request retrieve a list of JSON objects containing PG crimes information from the database

# Known BUGS
* The website has **No** security, so do not put any sensitive information
* 
# Future Development

