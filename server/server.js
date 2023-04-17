const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyparser = require('body-parser');
const sql = require('mysql');
const path = require('path');

const app = express();

app.use('/img',express.static('public/images'));
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


const db = sql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"special_lab"
})

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        const uploadDir = path.join(__dirname, 'public', 'images');
        cb(null,uploadDir)
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    }
})

const upload = multer({storage:storage});

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

//receiving formdata from client
//here upload.single("image") image-name is the name we speciied in formdata
app.post('/addachieve',upload.single('image'),(req,res)=>{

    const data = req.body;
    console.log(data)
    console.log(req.file.filename)
    const query = "INSERT INTO achievements VALUES (?,?,?,?,?)"

    db.query(query,['DEFAULT',data.labcode,data.name,data.name,req.file.filename],(err,resu)=>{
        if (err) console.log(err)
        else{
            res.send(resu)
        }
    })
})


app.listen(5000, ()=>{
    console.log("App listening on port 5000")
})


