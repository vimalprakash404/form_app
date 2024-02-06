const express = require('express')
const app  = express()
const student = require("./src/router/student")
const bodyParser = require('body-parser');
const path = require("path")
require("./src/db/connection")
const port = 4000
var cors = require('cors')


app.use(cors())
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});
app.use(student);
app.listen(port , ()=>{
    console.log(`server is running on http://localhost:${port}`)
})