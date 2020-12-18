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



// POST add new crimeType
resultsRouter.post('/result', async (req, res) => {
  // now we have access to req.body due to body-parser (see index.js)
  if (!req.body) {
    return resizeBy.status(400).send('Request body is missing')
  }

  let newType = {
    crimeType: req.body.crimeType
  }

  // First make sure that a record doesn't already exist
  let checkIfExistSql = "select * from results where crimeType = ?"
  console.log("req.body.crimeType: " + req.body.crimeType)
  let params = [req.body.crimeType]
  let nameExists = false;
  const rows = await new Promise((resolve, reject) => {
      db.all(checkIfExistSql, params, (err, rows) => {
        if (err) {
          res.status(400).json({ "error": err.message }).send();
          return;
        }
        console.log("ROWS:" + rows.length);
        if(rows.length > 0){
          nameExists = true;
          res.json({
            "message": "crimeType already exists" 
          }).send()
          resolve(rows);
        }
        else{
          resolve(rows);
        }
      });
    });

  console.log("crimeType exists:"+ nameExists);
  if(nameExists)
    return;
  
  var insertsql = 'INSERT INTO results (crimeType, searchNum) VALUES (?,?)'
  let input = [req.body.crimeType, 1]
  db.run(insertsql, input, function (err, result) {
    if (err) {
      res.status(400).json({ "error": err.message })
      return;
    }
    res.json({
      "message": "success",
      "data": newType,
      "id": this.lastID
    })
  });

})

module.exports = resultsRouter