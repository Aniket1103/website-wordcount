const app = require('./app.js')
const dotenv = require('dotenv').config();

app.listen(process.env.PORT || "3000", () => {
    console.log(`App is listening on port ${process.env.PORT || "3000"}`);
})