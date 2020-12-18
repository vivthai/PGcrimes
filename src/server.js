const express = require('express')
const app = express()
let resultsRoute = require('./routes/results')
let path = require('path')
let bodyParser = require('body-parser')
let db = require("./database.js")
// Declare filesystem
let fs        = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
  
app.use(resultsRoute)

app.use(express.static('public'))
const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.info(`Server has started on ${PORT}`)) 