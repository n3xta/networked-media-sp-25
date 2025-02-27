// /////////////////////////////////
//  1. library imports
// /////////////////////////////////
const express = require('express')
const parser = require('body-parser')
const multer = require('multer')

// /////////////////////////////////
// 2. app setting
// /////////////////////////////////
const app = express()
const encodedParser = parser.urlencoded({extended: true})
const uploadProcessor = multer({dest: "public/upload"})

app.use(express.static('public'))   // serves all the static files from the public folder
app.use(encodedParser)
app.set("view engine", "ejs")

let messages = []

// /////////////////////////////////
// 3. routes
// /////////////////////////////////
app.get('/', (req, res)=>{
    // res.send('hello')
    const data = { posts: messages}

    res.render('home.ejs', data)
})

app.get('/form', (req, res)=>{
    res.render('form.ejs')
})

// handles the data coming in from the form
// redirects back to the home page once the data has been processed 
app.post('/submit', uploadProcessor.single("img"), (req, res)=>{
    // messages.push({
    //     user: req.query.username,
    //     color: req.query.color
    // })
    console.log(req.body)
    res.redirect('/')
})
// /////////////////////////////////
// 4. listen 
// /////////////////////////////////
app.listen(5555, ()=>{
    console.log('server is live at http://127.0.0.1:5555')
})