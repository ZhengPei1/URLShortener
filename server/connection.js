const mysql = require("mysql2/promise");

let connectionEstablished = false;
let database = false;

async function createConnection(){
    try{
        const db = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DB_NAME
        });
        return db;
    }catch(err){
        console.log(err);
        console.log("Can't connect to db");
        return false;
    }
}


// try to use the same connection whenever possible
async function getConnection(){
    if(connectionEstablished)
        return database;
    else{
        database = await createConnection();
        if(database){
            connectionEstablished = true;
        }
        return database;
    }
}


module.exports = {
    getConnection: getConnection
};