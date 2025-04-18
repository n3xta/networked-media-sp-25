// using p5 globally
// function setup() {
//   createCanvas(window.innerWidth, window.innerHeight);
// }

// function draw() {
//   background('lightblue');
// }

const myp5Sketch = (s) => {
  
  // s.setup = () => {} is the same as function setup(){}
  // the new syntax to use instance mode / multiple canvas on a page
  s.setup = () => {
    s.createCanvas(400, 400)
  }
  
  s.draw = () => {
    s.background('lightpink')
  }

}

let myp5 = new p5(myp5Sketch, 'canvas1')

// second canvas on the page
const myp5Sketch2 = (s) => {
  
  // s.setup = () => {} is the same as function setup(){}
  // the new syntax to use instance mode / multiple canvas on a page
  s.setup = () => {
    s.createCanvas(200, 200)
  }
  
  s.draw = () => {
    s.background('lightgreen')
  }

}

let myp52 = new p5(myp5Sketch2, 'canvas2')