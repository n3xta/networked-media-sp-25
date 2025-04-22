// first parameter is anon p5 function, second is id of element to add to canvas
let mySketch = new p5((s)=>{

    let xpos

    // reference the s parameter whenever we use a p5 function
    s.setup = () =>{
        s.createCanvas(500, 500)

        xpos = s.width/2
    }

    s.draw = () => {
        s.background('lightblue')

        s.circle(xpos, s.height/2, 50)

        xpos += s.sin(s.frameCount * .1) * 5
        
        // 59 % 60 = 59
        // 61 % 60 = 1
        // 60 % 60 = 0
        if(s.frameCount % 60 == 0){
            console.log('1 second has passed')
        }
        
        if(s.frameCount / 60 == 1){
            s.saveCanvas()
        }
    }


}, "mysketch")