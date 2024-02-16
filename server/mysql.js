const mysql = require("mysql");
const shortid = require('shortid');
const auth = require("./auth.json");

const db = mysql.createConnection({
    host: auth.host,
    user: auth.user,
    password: auth.pass,
    database: auth.db_name
});

// param: String URL - the URL needs to be shortened
// return a shortened version of URL from database
// or returns false and prints error messages

function findURL(URL){
    const q = `SELECT * FROM ${auth.table_name} WHERE originalURL = ?`;

    db.query(q, [URL], (err, res) => {
        if(err){
            console.log("can't connect to database!")
            console.log(err);
            return false;
        }
        
        // if the current URL hasn't been generated before
        if(res.length === 0){
            const short = shortid.generate();
            const val = { originalURL: URL, shortUrl: short, click: 1 };
            const qr = `INSERT INTO ${auth.table_name} SET ?`

            db.query(qr, val ,(err, res) =>{
                if(err){
                    console.log("Error happens when inserting into db");
                    return false;
                }
            })
            return short;

        }
        
        // if the current URL has been generated before
        else{
            const short = res[0].shortUrl;
            const click = res[0].click;
            const qr = `UPDATE ${auth.table_name} SET click = ? WHERE shortUrl = ?`
            db.query(qr, [click + 1, short], (err, res) =>{
                if(err){
                    console.log("Error updating table!");
                    return false;
                }
            })
            console.log(short);
            return short;
        }
    });
}

module.exports = findURL;