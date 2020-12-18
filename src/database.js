let sys = require("sys"), fs = require("fs");
let sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "pgcrimesearch.db" //name and create the database

// If you use the TEXT storage class to store date and time value, you need to use the ISO8601 string format as follows:
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.')
        let install_sql = fs.readFileSync('./src/install_sqlite_tables.sql', 'utf-8').toString();
        install_sql = install_sql.replace("\n", "");

        const dataArr = install_sql.toString().split(');');
        let x = 10;

        db.serialize(() => {
            db.run('PRAGMA foreign_keys=OFF;');
            dataArr.forEach((query) => {
                tempquery = query.replace(/(\r\n|\n|\r)/gm, "");
                if (tempquery && (tempquery.toString().startsWith('--') === false)) {
                    tempquery += ');';
                    db.run(tempquery, err => {
                        if (err) {
                            console.log(err.message);
                            throw err;
                        }
                    });
                }
            });
        });

    }
    console.log("database loaded")
});

module.exports = db;
