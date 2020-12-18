// https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/
// https://levelup.gitconnected.com/running-sql-queries-from-an-sql-file-in-a-nodejs-app-sqlite-a927f0e8a545

let sys=require("sys"), fs=require("fs");
let sqlite3 = require('sqlite3').verbose();
//let md5 = require('md5')

//const DBSOURCE = "db.assignment2tasks"
const DBSOURCE = "pgcrimesearch.db"

// If you use the TEXT storage class to store date and time value, you need to use the ISO8601 string format as follows:
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message);
      throw err;
    }else{
        console.log('Connected to the SQLite database.')
        //let install_sql = fs.readFileSync('/Users/bill/gitUMD/INST377-ESG1-FALL_2020/public/assignment_2/src/install_sqlite_tables.sql', 'utf-8')
        let install_sql = fs.readFileSync('./src/install_sqlite_tables.sql', 'utf-8').toString();
        install_sql = install_sql.replace("\n","");
        //console.log('install_sql:' + install_sql)
        // Convert the SQL string to array so that you can run them one at a time.
        // You can split the strings using the query delimiter i.e. `;` in // my case I used `);` because some data in the queries had `;`.
        const dataArr = install_sql.toString().split(');');
        let x = 10;

        db.serialize(() => {
            db.run('PRAGMA foreign_keys=OFF;');
            //db.run('BEGIN TRANSACTION;');
            //console.log("dataArr[0]: " + dataArr[0] );
            dataArr.forEach((query) => {
                //console.log('query:' + query);
                tempquery = query.replace(/(\r\n|\n|\r)/gm, "");
                console.log("tempquery.startsWith:" + tempquery.startsWith('--'));
                console.log(tempquery.startsWith('--'));
                if(tempquery && (tempquery.toString().startsWith('--') === false)) {
                    tempquery += ');';
                    console.log('full query:' + query)
                    db.run(tempquery, err => {
                       if(err) {
                           console.log(err.message);
                           throw err;
                       }
                    });
                }
            }); 
            /*db.run(dataArr[0] + ");", err => {
                if(err) {
                    console.log(err);
                    throw err;
                }
            //db.run('COMMIT'); 
            console.log("Commited" );
            });*/
        });
        
    }
});

module.exports = db;
