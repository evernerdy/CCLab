
let yArray = [];
let xArray = [];
let rX;
let rY;
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(0, 50);
  noStroke();
  // let noiseValueX = noise(0.01*frameCount);
  // let noiseValueY = noise(0.01*frameCount + 10000);
  // rX = map (noiseValueX, 0, 1, 0, 800);
  // rY = map (noiseValueY, 0, 1, 0, 400);
  // translate (rX, rY);
  // rotate (0.1*frameCount);
  for (let i=0; i<10000; i++)
  {
    yArray[i] += random (-5, 10);
    xArray [i] += random (-10, 5);
    rect (yArray[i], xArray[i], 20, 20);
  }
  xArray.push (250);
  yArray.push (400);
  
}

// function mousePressed()
// {
//   yArray.push (mouseX);
//   xArray.push (mouseY);
// }