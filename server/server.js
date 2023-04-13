const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyparser = require('body-parser');
const sql = require('mysql');
const path = require('path');


const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use('/img',express.static(__dirname+'/public/images'));

const db = sql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"reactimg"

})

app.listen(5000, ()=>{
    console.log("App listening on port 5000")
})


