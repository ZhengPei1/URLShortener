const mysql = require("mysql2/promise");
const shortid = require('shortid');
const { getConnection } = require("./connection.js");
const { query } = require("express");

// param: String URL - the URL needs to be shortened
// return a shortened version of URL from database
// or returns false and prints error messages

async function generateURL(URL) {
    const db = await getConnection();

    const q = `SELECT * FROM ${process.env.TABLE_NAME} WHERE originalUrl = ?`;

    let [query_result] = await db.query(q, [URL])

    try {
        await db.query(q, URL);
    } catch (err) {
        console.log(err);
        console.log("can't connect to database!")
        return false
    }

    // if the current URL hasn't been generated before
    if (query_result.length === 0) {
        const short = shortid.generate();
        const val = { originalUrl: URL, shortUrl: short, request: 1 };
        const qr = `INSERT INTO ${process.env.TABLE_NAME} SET ?`

        try{
            await db.query(qr, val);
        }catch(err){
            if (err) {
                console.log("Error happens when inserting into db");
                return false;
            }
        }
        
        return short;
    }

    // if the current URL has been generated before
    else {
        const short = query_result[0].shortUrl;
        const request = query_result[0].request;
        const qr = `UPDATE ${process.env.TABLE_NAME} SET request = ? WHERE shortUrl = ?`

        try{
            await db.query(qr, [request + 1, short]);
        }catch(err){
  
            console.log("Error updating table!");
            return false
        }
        
        return short;
    }
}


// param: String URL - the shortened version of the URL
// return the original URL from the database
// or returns false and prints error messages
async function findURL(URL) {
    const db = await getConnection();

    const q = `SELECT * FROM ${process.env.TABLE_NAME} WHERE shortUrl = ?`;
    
    try{
        const [res] = await db.query(q, URL);

        if(res.length === 0){
            console.log("can't find the given url");
            return false;
        }
        
        return res[0].originalUrl;

    }catch(err){
        console.log("database error");
        return false;
    }

}


// param: none 
// return the 10 (or less) URLS with the most number of requests
// or returns false and prints error messages

async function findPopularUrls(){
    const db = await getConnection();

    // Limit: 5
    const q = `SELECT * FROM ${process.env.TABLE_NAME} ORDER BY request DESC LIMIT 5`

    try{
        const [query_result] = await db.query(q);
        return query_result;
    }catch(err){
        console.log("database error - can't access url history");
        return false;
    }
}

module.exports = { generateURL, findURL,  findPopularUrls };