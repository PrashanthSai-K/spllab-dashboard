const express = require('express');

const cors = require('cors');
const bodyparser = require('body-parser');

//Mysql package to communicate with db
const sql = require('mysql');

//Local Storage package
const multer = require('multer');

//to assign path to local storage
const path = require('path');

//To verify google token from frontend, package gicen by google
const {OAuth2Client} = require('google-auth-library');

//To use the session storage this package is required by express
const session = require('express-session');

//to create session key need crypto package
const crypto = require('crypto');

//Secret key generation
const secret = crypto.randomBytes(32).toString('hex');

const cookieparser = require('cookie-parser');

//JsonWebToken Creator
const jwt = require('jsonwebtoken');

//Configuring google client
const client = new OAuth2Client('494572126295-13aremb1sucd9nshgfgemb5gmul0n27c.apps.googleusercontent.com','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');

const app = express();

app.use(cookieparser());

// set up session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }));


//making the storage static to serve it to front end
app.use('/img', express.static('public/images'));
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//Configuring session storage
app.use(session({
    secret: secret,
    resave:false,
    saveUninitialized:true
}));

//Making a SQL Connection
const db = sql.createConnection({
    host: "",
    user: "",
    password: "",
    database: "",
    port: ""
})

//Verifying if the conecction is successful
db.connect((err) => {
    if (err) {
        console.error('Error connecting to SQL server: ', err);
        return;
    }
    console.log('Connected to SQL server!');
})

//Assigning a Local Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, 'public', 'images');
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
//Configuring  multer
const upload = multer({ storage: storage });

//Sending achievements data to frontend
app.get("/labdata/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM achievements WHERE labcode =?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.send(result);
        }
    })
})

app.get("/labbasicdata/:id", (req, res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM labdetails WHERE labcode=?"

    db.query(sql,[id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })

})

//Sending projects data to frontend
app.get("/labproject/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM projects JOIN labdetails ON projects.labcode = labdetails.labcode WHERE projects.labcode = ? AND labdetails.labcode = ?";
    db.query(sql, [id, id], (error, result) => {
        if (error) console.log(error)
        else {
            
            res.send(result)
        }
    })
})


//receiving formdata from client
//here upload.single("image") image-name is the name we speciied in formdata
app.post('/addachieve', upload.single('image'), (req, res) => {

    const data = req.body;
    console.log(data)
    console.log(req.file.filename)
    const query = "INSERT INTO achievements VALUES (?,?,?,?,?)"

    db.query(query, ['DEFAULT', data.labcode, data.name, data.name, req.file.filename], (err, resu) => {
        if (err) console.log(err)
        else {
            res.send(resu)
        }

    })
})

//Sending list of labs available
app.get("/lablist", (req, res) => {
    db.query("SELECT * FROM labdetails", (err, result) => {
        if (err) console.log(err)
        res.send(result);
    })
})


//login api request to assign user role
app.get("/login", async (req, res) => {

    // function call to verify the token received from front end
    async function verify(){
        const authHeader = req.headers.authorization
        const token = authHeader.split(' ')[1]
        const ticket = await client.verifyIdToken({
            idToken:token,
            audience: "494572126295-13aremb1sucd9nshgfgemb5gmul0n27c.apps.googleusercontent.com"
        })

        //after verification getting payload
        const payload = ticket.payload
    
        //using payload to verify that the user is already registered or new
        if(payload){

            // var role = "user"
            db.query("SELECT * FROM users", (err, result)=>{
                if(Object.values(result).some(innerres=>Object.values(innerres).includes(payload['sub']))){
                    //getting the role of the user from DB using sub value and sending it to frontend
                    const role = result.filter((item)=> item.user_id== payload.sub).map((item)=> item.role)
                    const token = jwt.sign({roollee: role}, "abcdefghijklmnoplmnopqrstuvwxyz")
                    res.send(token)
                }else{//if new add his data to database
                    db.query("INSERT INTO users (name, email,user_id) VALUES (?, ?, ?)", [payload.name,payload.email,payload.sub],(err,result)=>{
                    })
                    const role = "user"
                    const token = jwt.sign({roollee: role}, "abcdefghijklmnoplmnopqrstuvwxyz")
                    res.send(token)
                }
            })

        }else{
            return "unauthorized"
        }
    }
    verify();
})



app.listen(5000, () => {
    console.log("App listening on port 5000")
})


