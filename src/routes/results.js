let express = require('express')
let resultsRouter = express.Router()
let db = require('../database');

//GET all results
resultsRouter.get('/allResults', (req, res) => {
    
    console.log("Get all results");
    let sql = "select * from results";
    db.all(sql,  (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
})

//GET a result
resultsRouter.get('/result', (req, res) => {
  if (!req.query.crimeType) {
      return res.status(400).send('Missing URL parameter crimeType')
  }
  let sql = "select results.id, crimeType, searchNum" +
    " from results" +
    " where results.crimeType = ?"
  console.log("req.query.crimeType: " + req.query.crimeType)
  let params = [req.query.crimeType]
  db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":row
      })
    });
})

//Update
resultsRouter.put('/result', (req, res) => {
  console.log("PUT called")
  var data = {
      id : req.query.typeId, // **Note that I'm pulling this from the 'query' vs the 'body'
      crimeType: req.body.crimeType,
      searchNum:  req.body.searchNum + 1
  }
  console.log("data.id:" + data.id + " crimeType:" + data.crimeType + " searchNum:" + data.searchNum)
  if (!data.id) {
      return res.status(400).send('Missing URL parameter id')
  }
  db.run(
      `UPDATE results set 
         crimeType = ?,
         searchNum = ?
         WHERE id = ?`,
      [data.crimeType, data.searchNum, data.id],
      function (err, result) {
          if (err){
              res.status(400).json({"error": res.message})
              console.log(err);
              return;
          }
          res.json({
              message: "success",
              data: data,
              changes: this.changes
              
          })
  });
})

module.exports = resultsRouter