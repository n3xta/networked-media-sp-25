// put all my front-end (index.html, main.js, style.css) into public folder

const express = require('express')
const nedb = require("@seald-io/nedb")

const app = express()

app.use(express.static('public'))
app.set('view engine', 'ejs')

// setting up my database
let database = new nedb({
    filename: "database.txt",
    autoload: true
})

app.get('/', (req, res)=>{
    res.render('index.ejs')
})

app.get('/loadCanvas', (req, res)=>{
    database.find( {}, (err, data)=>{
        res.json(data)
    }) 
})

app.post('/saveCanvas', (req, res)=>{
    console.log(req.query)

    let valuesToBeAdded = {
        xpos: req.query.x,
        ypos: req.query.y,
        r: req.query.r,
        g: req.query.g,
        b: req.query.b
    }

    database.insert(valuesToBeAdded, (err, newData)=>{
        res.redirect('/')
    })
    // res.redirect('/')
})

app.listen(3000, ()=>{
    console.log('http://127.0.0.1:3000')
})