const express = require("express");
const cors = require("cors");
const findURL = require("./mysql.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

//
app.get("/:shortURL", (req, res) =>{
    const URL = findURL(req.params.userURL);
    if(URL){
        res.redirect(URL);
    }
    res.status(404).send();
})


app.post("/shorten", (req, res) => {
    const URL = findURL(req.body.userURL);

    if(URL){
        res.status(200).send(URL);
    }
    res.status(404).send();
})

app.listen(PORT, ()=> {
    console.log(`server is listing on port ${PORT}`);
})