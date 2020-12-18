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
/*
data = { 'taskId': updateTaskId,
'taskName':updateTaskName,
'taskFirstName':updateTaskFirstName,
'taskGroup':updateTaskGroup,
'taskDueDate':updateTaskDueDate,
'taskComplete':updateTaskComplete };
*/
// router.put('/task', (req, res) => {
//   console.log("PUT called")
//   var data = {
//       id : req.query.taskId, // **Note that I'm pulling this from the 'query' vs the 'body'
//       taskName: req.body.taskName,
//       personId :  req.body.taskFirstName,
//       groupId :  req.body.taskGroup,
//       dueDate :  req.body.taskDueDate,
//       priority :  req.body.taskPriority,
//       complete :  req.body.taskComplete
      
//   }
//   console.log("data.id:" + data.id + " name:" + data + " due_date:" + data.dueDate)
//   if (!data.id) {
//       return res.status(400).send('Missing URL parameter id')
//   }
//   db.run(
//       `UPDATE tasks set 
//          taskName = ?,
//          dueDate = ?,
//          groupId = ?,
//          personId = ?,
//          complete = ?,
//          priority = ?
//          WHERE id = ?`,
//       [data.taskName, data.dueDate, data.groupId, data.personId, data.complete, data.priority, data.id],
//       function (err, result) {
//           if (err){
//               res.status(400).json({"error": res.message})
//               console.log(err);
//               return;
//           }
//           res.json({
//               message: "success",
//               data: data,
//               changes: this.changes
              
//           })
//   });
// })

module.exports = resultsRouter