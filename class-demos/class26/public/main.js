// first parameter is anon p5 function, second is id of element to add to canvas
let mySketch = new p5((s)=>{

    let xpos

    let circles = []

    // reference the s parameter whenever we use a p5 function
    s.setup = () =>{
        s.createCanvas(500, 500)

        xpos = s.width/2

        let download = s.createButton('download')
        download.mousePressed(s.downloadData)

    }

    s.draw = () => {
        s.background('lightblue')
        s.push()
        s.fill(68, 85, 90, 50)
        s.rect(0,0, s.width, s.height)
        s.pop()
        s.circle(xpos, s.height/2, 50)

        xpos += s.sin(s.frameCount * .1) * 5
        
        // 59 % 60 = 59
        // 61 % 60 = 1
        // 60 % 60 = 0
        if(s.frameCount % 60 == 0){
            console.log('1 second has passed')
        }

        for(let i = 0; i < circles.length; i++){
            s.push()
            s.fill(circles[i].r, circles[i].g, circles[i].b)
            s.ellipse(circles[i].xpos, circles[i].ypos, 25)
            s.pop()
        }

        s.filter(s.BLUR)
    }

    s.downloadData = () => {
        const canvas = document.getElementById("defaultCanvas0")

        canvas.toBlob(async (blob)=>{
            console.log(blob)

            const newImg = document.createElement('img')
            const url = URL.createObjectURL(blob)

            newImg.src = url
            document.body.appendChild(newImg)

            let formData = new FormData()
            // the javascript way of using html form and having a type of file
            // <input type="file" name="theImage">
            // type=file name=blob
            formData.append("blob", blob, "img")

            await fetch('/upload', {
                method: "POST",
                body: formData
            })
        })
    }

}, "mysketch")