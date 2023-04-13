const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyparser = require('body-parser');
const sql = require('mysql');
const path = require('path');

var labname="";

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use('/img',express.static('/public/images'));

const db = sql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"special_lab"

})


app.get("/labdata/:id",(req,res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM achievements WHERE labcode =?";
    db.query(sql,[id],(error, result)=>{
        if (error){
            console.log(error);
        }else{
            res.send(result);
        }
    })
})

app.get("/labproject/:id",(req,res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM projects WHERE labcode = ?";
    db.query(sql,[id],(error,result)=>{
        if (error) console.log(error)
        else{
            res.send(result)
        }
    })
})




app.listen(5000, ()=>{
    console.log("App listening on port 5000")
})


