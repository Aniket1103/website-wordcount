const express = require('express');
const cors = require('cors');
const app = express();
const { fetchUrlContent } = require('./util/fetchUrlContent');
const { cleanContent } = require('./util/cleanContent');
const { countWords } = require('./util/countWords');

app.use(cors());

app.post("/insights", async (req, res) => {
    console.log(req.body);

    //fetch the HTML content
    const html = await fetchUrlContent("https://www.guthib.com");

    //clean the content (convert to text)
    const text = cleanContent(html);

    //count the word occurence and send it back
    const words = await countWords(text);
    console.log("Words Count -> ", words);
    res.json({ wordCount : words, favourite : false});
})

module.exports = app;