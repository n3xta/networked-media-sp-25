// put all my front-end (index.html, main.js, style.css) into public folder

const express = require('express')
const nedb = require("@seald-io/nedb")

// npm install multer body-parser
const parser = require('body-parser')
const multer = require('multer')

const app = express()
const encodedParser = parser.urlencoded({extended: true})
const upload = multer({dest: "public/upload"})

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(encodedParser)

// setting up my database
let database = new nedb({
    filename: "database.txt",
    autoload: true
})

app.get('/', (req, res)=>{

    let sortQuery = {
        timestamp: 1
    }

    // retrieving all the data from the database
    database.find({}).sort(sortQuery).exec((err, data)=>{
        console.log(data)
        // rendering all of the data to the index
        res.render('index.ejs', {imgs: data})
    })
})

app.post('/upload', upload.single("blob"), (req, res)=>{
    // check if file is successful
    if(req.file){
        // creating a data object that will store the filename
        let data = {
            imgSrc: "upload/" + req.file.filename, 
            timestamp: Date.now()
        }

        // adding the data to the database
        database.insert(data, ()=>{
            res.redirect('/')
        })
    }
})

app.listen(3000, ()=>{
    console.log('http://127.0.0.1:3000')
})