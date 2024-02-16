const express = require("express");
const cors = require("cors");
const {generateURL, findURL} = require("./mysql.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

//
app.get("/:shortURL", async (req, res) =>{
    const result = await findURL(req.params.shortURL);
    if(!result){
        console.log("Error in finding URL")
        res.status(404).send();
        return;
    }
    res.redirect(result)
    
})


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

app.listen(PORT, ()=> {
    console.log(`server is listing on port ${PORT}`);
})