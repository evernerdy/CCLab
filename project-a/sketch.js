let NoiseValueM;
build = false;

let faceX = 0;
let faceY = 0;
let rotateL = 0;
let rotateLL = 0;
let rotate0 = 0;
let rotateSpeed0 = 0.01;
let speedLL = 0;
let randomness = 0;
let scaleCreature = 0.02;

let a = 0;
let b = 0;
let c = 0;
let mountainShape = 0.01;
let crazy = 0.01;
let breakBoundary = 0;
let Life = 15;
let move = false;

let buildingStart = 0;
let buildingWidth = 4;
let buildingColor;
let rise1 = 300;
let rise2 = 300;
let rise3 = 300;
let rise4 = 300;
let rise0 = -500;

let Doom = 0;
DoomDecay = false;
function setup() {
   let canvas = createCanvas(800, 500);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");
}

function draw() {
  //detecting should the creature go crazy
  if (rise1 <= 0 || rise2 <= 0 || rise3 <= 0 || rise4 <= 0) {
    build = true;
  }

  //the creature go crazy
  if (build == true) {
    a = random(0, 255);
    b = random(0, 255);
    c = random(0, 255);
    Life += 2;
    crazy = 1;
    breakBoundary = 300;
    mountainShape += 0.001;
    Doom += 1;
    move = false;
    rise = random(-300, 300);
  }

  // environment, creature, and interaction that build houses
  drawMountains(a, b, c, mountainShape);

  drawBackBuilding(rise0);

    drawBuilding(rise1, rise2, rise3, rise4);

  drawCreature(c, b, a, crazy, breakBoundary, scaleCreature);
  //moving people
  if (rise0> 500)
    {
      rise0 = -500;
      move = false;
    }
  
  if (move == true && rise0 <= 700)
    {
      rise0+=50;
    }
  //Destroy the World after enough buildings
  fill(255, Doom);
  rect(0, 0, 800, 500);

  //reset the world
  if (Doom >= 300) {
    Life = 27;
    rise0 = -500;
    rise1 = 300;
    rise2 = 300;
    rise3 = 300;
    rise4 = 300;
    build = false;
    scaleCreature = 0.02;
    let noiseValueColorA = noise(frameCount);
    let noiseValueColorB = noise(frameCount + 10000);
    let noiseValueColorC = noise(frameCount + 20000);
    a = map(noiseValueColorA, 0, 1, 0, 255);
    b = map(noiseValueColorB, 0, 1, 0, 255);
    c = map(noiseValueColorC, 0, 1, 0, 255);
    crazy = 0.01;
    breakBoundary = 0;
    mountainShape = 0.01;
    DoomDecay = true;
  }
  if (DoomDecay == true) {
    Doom -= 10;
  }
  if (Doom < 0) {
    DoomDecay = false;
  }
}

function mousePressed() {
  move = true;
    crazy += 0.0002;
    breakBoundary += 4;
    scaleCreature += 0.015;
    if (mouseX > 0 && mouseX <= 200) {
      rise1 -= 10;
    } else if (mouseX > 200 && mouseX <= 400) {
      rise2 -= 10;
    } else if (mouseX > 400 && mouseX <= 600) {
      rise3 -= 10;
    } else if (mouseX > 600 && mouseX <= 800) {
      rise4 -= 10;
    }
}

function drawMountains(Ma, Mb, Mc, Me) {
  background(255);
  strokeWeight(3);
  for (j = 0; j < 12; j++) {
    for (i = 0; i < 800; i += 3) {
      noiseValueM = noise(mountainShape * i + 1000 * j);
      let M = map(noiseValueM, 0, 1, 0, 50 + j * 50);
      noStroke();
      fill(255, 255, 255, Life);
      textSize(15);
      text("生", i, M);
      stroke(Ma, Mb, Mc, 36);
      line(i, 500, i, M);
    }
  }
}

function drawCreature(Ca, Cb, Cc, movingSpeed, breakBoundary, scaleC) {
  push();
  let noiseValueA = noise(0.5 * movingSpeed * frameCount);
  let noiseValueB = noise(0.5 * movingSpeed * frameCount + 44444);
  faceX = map(noiseValueA, 0, 1, 0, 800);
  faceY = map(noiseValueB, 0, 1, 0, 100 + breakBoundary);

  //face
  if (build == true) {
    if (sin(frameCount) >= 0) {
      buildingColor = 0;
    } else {
      buildingColor = 255;
    }
  } else buildingColor = 0;
  stroke(Ca, Cb, Cc);
  strokeWeight(4);
  fill(buildingColor);
  translate(faceX, faceY);
  scale(scaleC);
  textAlign("center", "center");
  rotate0 = rotate0 + rotateSpeed0;
  if (rotate0 > 0.015 * PI || rotate0 < -0.015 * PI) {
    rotateSpeed0 = -rotateSpeed0;
  }
  rotate(rotate0);
  textSize(20);
  text("云云云云云云云", 0, -20);
  textSize(30);
  text("林林林林林林林林林", 0, 0);
  textSize(30);
  text("山山山山山山山", 0, 22);
  textSize(45);
  text("石石木石石", 0, 48);
  textSize(30);
  text("丛丛丛丛丛丛", 0, 70);
  text("丛丛丛丛丛丛", 0, 100);

  limb(80, 0.1, scaleC);
  limb(26.7, -0.1, scaleC);
  limb(-26.7, 0.12, scaleC);
  limb(-80, -0.13, scaleC);

  pop();
}
function limb(posX, speedL, acceleration) {
  push();

  translate(posX, 110);
  if (build == true) {
    if (random() > 0.5) {
      speedLL = speedLL + 1;
    } else {
      speedLL = speedLL - 1;
    }
  } else {
    speedLL = speedLL + 0.03 + 0.6 * acceleration;
  }
  rotateL = speedL * speedLL;
  rotate(rotateL);
  textSize(25);
  textAlign("left", "bottom");
  text("土土土", 0, 0);
  push();
  translate(74, 0);
  textSize(20);
  rotate(rotateLL);
  text("土土土土土", 0, 0);
  rotateLL = 2 * speedL * speedLL;
  pop();
  pop();
}
function drawBackBuilding(h5) {
  push();
  translate(0, h5);
  for (i = 0; i <= 500; i++) {
    for (j = 50; j <= 800; j += 100) {
      let randomTall = random (-50, 50);
      let noiseValueBuildingBackground = noise(i + 2000 * j);
      let noiseValueBB = map(
        noiseValueBuildingBackground,
        0,
        1,
        200,
      -200
      );

      noStroke();
      fill (c,b,a, 100);
      textSize (20);
      text ("人",j+0.5*noiseValueBB, i-200);
      
      
    }
  }
  pop();
}
function drawBuilding(h1, h2, h3, h4) {
  push();
  building(h1, 100);
  building(h2, 300);
  building(h3, 500);
  building(h4, 700);
  pop();
}
function building(H, area) {
  push();
  translate(0, H);
  for (i = 0; i <= 500; i += 2) {
    let noiseValueBuildingBackground = noise(i + 100 * area);

    let noiseValueBB = map(
      noiseValueBuildingBackground,
      0,
      1,
      -30 - 0.2 * i,
      30 + 0.2 * i
    );

    stroke(c, b, a, 200);
    fill(c, b, a, 3);
    rect(area + noiseValueBB, 150 + i, 0.08 * i, 50);
    text("爱", area + noiseValueBB, 150 + i);

    rect(area + 1.3 * noiseValueBB, 300 + i, 0.08 * i, 50);
    
    //backtower
    
  stroke(c, b, a, 100);
    fill(c, b, a, 3);
    rect(area+80 + 0.8*noiseValueBB, 150+area/3 + i, 0.08 * i, 50);
    text("爱", area+80 + 0.8*noiseValueBB, 150+area/3 + i);

    rect(area+80 + noiseValueBB, 300+area/3 + i, 0.08 * i, 50);
  }
  pop();
}
