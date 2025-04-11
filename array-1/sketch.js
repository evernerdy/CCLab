let greetings = ["Hallo", "哈喽", "Bonjour", "Annyeong-haseyo", "Zdrastvuite"];
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(220);
 
  for (i=0;i<greetings.length;i++)
  {
    // if(i == 0)
    // {
    // fill ("red");
    // }
    // else if (i == greetings.length-1)
    // {
    //   fill ("blue");
    // }
    // else{
    //   fill (0);
    // }

    let randomIndex = floor (random (0, greetings.length));
    if (i == randomIndex)
    {
      fill ("yellow");
    }
    else
    {
      fill ("black");
    }
    let greeting = greetings[i];
    let y = height/2 + i*12;
  text (greeting, width/2, height/2+12*i);
  }

}