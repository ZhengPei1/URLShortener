const mysql = require("mysql2/promise");
const util = require("util");
const shortid = require('shortid');
const auth = require("./auth.json");
const { query } = require("express");

// param: String URL - the URL needs to be shortened
// return a shortened version of URL from database
// or returns false and prints error messages

async function generateURL(URL) {
    const db = await mysql.createConnection({
        host: auth.host,
        user: auth.user,
        password: auth.pass,
        database: auth.db_name
    });

    const q = `SELECT * FROM ${auth.table_name} WHERE originalURL = ?`;

    let [query_result] = await db.query(q, [URL])
    


    try {
        await db.query(q, URL);
    } catch (err) {
        console.log(err);
        console.log("can't connect to database!")
        db.end();
        return false
    }

    // if the current URL hasn't been generated before
    if (query_result.length === 0) {
        const short = shortid.generate();
        const val = { originalURL: URL, shortUrl: short, click: 1 };
        const qr = `INSERT INTO ${auth.table_name} SET ?`

        try{
            await db.query(qr, val);
        }catch(err){
            if (err) {
                console.log("Error happens when inserting into db");
                db.end();
                return false;
            }
        }
        db.end();
        return short;
    }

    // if the current URL has been generated before
    else {
        const short = query_result[0].shortUrl;
        const click = query_result[0].click;
        const qr = `UPDATE ${auth.table_name} SET click = ? WHERE shortUrl = ?`

        try{
            await db.query(qr, [click + 1, short]);
        }catch(err){
  
            console.log("Error updating table!");
            db.end();
            return false
        }
        db.end();
        return short;
    }
}

async function findURL(URL) {
    const db = await mysql.createConnection({
        host: auth.host,
        user: auth.user,
        password: auth.pass,
        database: auth.db_name
    });

    const q = `SELECT * FROM ${auth.table_name} WHERE shortUrl = ?`;
    
    try{
        const [res] = await db.query(q, URL);

        if(res.length === 0){
            console.log("can't find the given url");
            db.end();
            return false;
        }

        db.end();
        return res[0].originalURL;
    }catch(err){
        console.log("database error");
        db.end();
        return false;
    }

}


module.exports = { generateURL, findURL };