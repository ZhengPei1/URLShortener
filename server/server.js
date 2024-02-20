const express = require("express");
const cors = require("cors");
const {generateURL, findURL,  findPopularUrls} = require("./mysql.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// request to get the most popular url from url history
app.get("/history", async (req, res) => {
    const result = await findPopularUrls();

    if(!result){
        console.log("Error when trying to fetch URL history from database");
        res.status(404).send();
        return
    }
    res.status(200).send(result);
})


// request to shorten the given url
app.post("/shorten", async (req, res) => {
    const result = await generateURL(req.body.userURL);

    if(!result){
        console.log("Error in generating URL");
        res.status(404).send();
        return;
    }

    const fullUrl = req.protocol + '://' + req.get('host') + '/' + result;
    res.status(200).send(fullUrl);
})

// request the original url from database
app.get("/:shortURL", async (req, res) =>{
    const result = await findURL(req.params.shortURL);
    if(!result){
        console.log("Error in finding URL")
        res.status(404).send();
        return;
    }
    res.redirect(result)
    
})



app.listen(PORT, ()=> {
    console.log(`server is listing on port ${PORT}`);
})