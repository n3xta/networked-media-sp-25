// first parameter is anon p5 function, second is id of element to add to canvas
let mySketch = new p5((s)=>{

    let xpos

    let circles = []

    // reference the s parameter whenever we use a p5 function
    s.setup = () =>{
        s.createCanvas(500, 500)

        xpos = s.width/2

        let button = s.createButton('save canvas')
        button.position(0,s.height)
        button.mousePressed(s.sendCanvasData)

        let loadButton = s.createButton('load canvas')
        loadButton.position(100, s.height)
        loadButton.mousePressed(s.loadCanvasData)
    }

    s.draw = () => {
        s.background('lightblue')

        // s.fill('white')
        s.circle(xpos, s.height/2, 50)

        xpos += s.sin(s.frameCount * .1) * 5
        
        // 59 % 60 = 59
        // 61 % 60 = 1
        // 60 % 60 = 0
        if(s.frameCount % 60 == 0){
            console.log('1 second has passed')
        }
        
        // if(s.frameCount / 60 == 1){
        //     s.saveCanvas()
        // }

        for(let i = 0; i < circles.length; i++){
            s.push()
            s.fill(circles[i].r, circles[i].g, circles[i].b)
            s.ellipse(circles[i].xpos, circles[i].ypos, 25)
            s.pop()
        }
    }

    s.mousePressed = async () => {
        let x = s.mouseX
        let y = s.mouseY

        let r = s.random(255)
        let g = s.random(255)
        let b = s.random(255)

        let c = s.color(r, g, b)

        circles.push({
            xpos: x,
            ypos: y,
            r: r,
            g: g,
            b: b
        })

        let position = new URLSearchParams({
            x: x,
            y: y,
            r: r,
            g: g, 
            b: b
        })

        let url = '/saveCanvas?' + position

        await fetch(url, {
            method: "POST"
        })
    }

    // making a custom function following the instance mode format
    s.sendCanvasData = async () => {
        let position = new URLSearchParams({
            x: 30,
            y: 30
        })

        let url = '/saveCanvas?' + position

        await fetch(url, {
            method: "POST"
        })
    }

    s.loadCanvasData = async() =>{
        let url = '/loadCanvas'

        let response = await fetch(url)
        // console.log(response.json())
        await response.json().then(s.success, s.err)
    }

    s.success = (result) =>{
        console.log(result)

        for(let i = 0; i < result.length; i++){
            circles.push({
                xpos: result[i].xpos,
                ypos: result[i].ypos, 
                r: result[i].r,
                g: result[i].g,
                b: result[i].b
            })
        }
        console.log(circles)
    }

    s.err = (e) =>{
        console.log(e)
    }

}, "mysketch")