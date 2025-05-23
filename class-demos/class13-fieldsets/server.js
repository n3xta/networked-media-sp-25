// 1. library imports
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')

// 2. app settings
const app = express()
const encodedParser = bodyParser.urlencoded({extended: true})
const up = multer({dest: "public/upload"})

app.use(express.static('public')) // setting the static file location to be public (css, front-end js, assets like images)
app.use(encodedParser) // allows express to parse the body of the request (req.body)
app.set("view engine", "ejs") // allows us to use ejs, specifically with render

let myPostArray = []

// 3. routes
app.get('/', (req, res)=>{
    res.render('index.ejs', {allPosts: myPostArray})
})

app.post('/upload', up.single("theimage"), (req, res)=>{
    // let now = new Date()
    console.log(req.body)

    // local temporary post obj that determines the structure of each element in the array
    let post = {
        text: req.body.textMessage,
    }
    // check if file exists
    if(req.file){
        // add the img location to the post object
        post.imgUrl = "upload/" + req.file.filename
    }

    // adds to the front of the array so the posts will go in order from newest to oldest
    myPostArray.unshift(post)
    // redirect back to the home pages
    res.redirect('/')
})



// 4. listener
app.listen(3339, ()=>{
    console.log('server is live at http://127.0.0.1:3339')
})