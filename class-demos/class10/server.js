// import express
const express = require('express')

// initialize the express app
const app = express()

app.use(express.static('public'))
app.set("view engine", "ejs")

// create first route
app.get('/', (request, response)=>{
    response.send('test server is working')
})

// create second route
app.get('/image', (request, response)=>{
    response.sendFile('img1.jpeg', {root: 'public'})
})

let posts = []
app.get('/submit', (request, response)=>{
    console.log(request.query)

    posts.push({
        username: request.query.user,
        message: request.query.message
    })
    
    // every route needs to have something that is sent back to the user, otherwise the load will hang
    response.send("thank you for submitting, " + "<a href=\"\/index.html\">back to home</a>")
})

app.get('/posts', (req, res)=>{
    let allPosts = ''
    for(let i = 0; i < posts.length; i++ ){
        allPosts += posts[i].username + " says " + posts[i].message + "<br />"
     }
     res.send(allPosts)
})

app.get('/template', (req, res)=>{
    let data = {
        posts: tSend
    }
    res.render("template.ejs", data)
})

let tSend = []
app.get('/send', (req, res)=>{
    tSend.push({
        user: req.query.user,
        post: req.query.message
    })
    res.redirect('/template')
})

app.listen(5555, ()=>{
    console.log('http://127.0.0.1:5555')
})