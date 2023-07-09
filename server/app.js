const express = require("express");
const cors = require("cors");
const URL = require("url").URL;
const crypto = require("crypto");
const app = express();
const { fetchUrlContent } = require("./util/fetchUrlContent");
const { cleanContent } = require("./util/cleanContent");
const { countWords } = require("./util/countWords");
const bodyParser = require("body-parser");

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(cors());

let insightsData = [];

app.post("/insights", async (req, res, next) => {
    // console.log(req.body);
    
    try{
        const { url } = req.body;   //Destructuring Body params

        try {
            new URL(url);
        } catch (err) {
            return res.status(400).json({error : "Entered URL is Invalid"})
        }
    
        //Fetch the HTML content
        const html = await fetchUrlContent(url);
    
        //Clean the content (convert to text)
        const text = cleanContent(html);
    
        //Count the word occurence and send it back
        const words = await countWords(text);
        console.log("Words Count -> ", words);

        const insight = { 
            id : crypto.randomUUID(),
            wordCount : words, 
            favourite : false, 
            domain : url
        };
        insightsData.push(insight);
        console.log(insightsData, insightsData.length)

        res.json(insight);
    }
    catch(error){
        next(error);
    }
})
//error handling middleware
app.use((err, req, res, next) => {
    console.error("err--------------------");
    res.status(500).json({ error: "Internal Server Error" });
});

app.get("/insights", (req, res) => {
    console.log(insightsData);
    res.json(insightsData);
})

app.patch("/insights/:id", (req, res) => {
    const { id } = req.params;
    const { favourite } = req.body;
    
    for(const insight of insightsData){
        if(insight.id === id){
            insight.favourite = favourite;
            console.log(insightsData)

            return res.json({insight});
        }
    }
    res.status(404).json({error : "Resource Not Found"});
})

app.delete("/insights/:id", (req, res) => {
    const { id } = req.params;
    console.log(id)
    insightsData = insightsData.filter(insight => insight.id !== id);
    console.log(insightsData, insightsData.length)

    res.json({message : `Insight with id "${id}" Deleted.`})
    // res.json(insightsData);
})



module.exports = app;