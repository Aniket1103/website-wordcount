const express = require('express');
const cors = require('cors');
const app = express();
const { fetchUrlContent } = require('./util/fetchUrlContent');
const { cleanContent } = require('./util/cleanContent');
const { countWords } = require('./util/countWords');

app.use(cors());

app.post("/", async (req, res) => {
    // return res.send("lsfjalj")
    console.log(req.body);
    
    //fetch the HTML content
    const html = await fetchUrlContent("https://www.guthib.com");
    console.log(html);

    //clean the content (convert to text)
    const text = cleanContent(html);
    // console.log("text-> ", text);

    //count the word occurence and send it back
    const words = await countWords(text);
    console.log("Words Count -> ", words);
    res.json({ wordCount : words, favourite : false});
})

async function fn(){
    const html = await fetchUrlContent("https://example.com");
    // console.log(html);
    const text = cleanContent(html);
    // console.log("text-> ", text);
    const words = await countWords(text);
    console.log("Words Count -> ", words);
}
// fn()

module.exports = app;