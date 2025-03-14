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

let buildingStart = 0;
let buildingWidth = 4;
let buildingColor;
let rise1 = 300;
let rise2 = 300;
let rise3 = 300;
let rise4 = 300;

let Doom = 0;
DoomDecay = false;
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");
}

function draw() {
  if (rise1 <= 0 || rise2 <= 0 || rise3 <= 0 || rise4 <= 0) {
    build = true;
  }

  if (build == true) {
    a = random(0, 255);
    b = random(0, 255);
    c = random(0, 255);
    crazy = 1;
    breakBoundary = 300;
    mountainShape += 0.001;
    Doom += 1;
    rise = random(-300, 300);
  }

  drawMountains(a, b, c, mountainShape);

  drawBuilding(rise1, rise2, rise3, rise4);

  drawCreature(c, b, a, crazy, breakBoundary, scaleCreature);

  //Destroy the World after enough buildings
  fill(255, Doom);
  rect(0, 0, 800, 500);

  //reset the world
  if (Doom >= 300) {
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
  if (rise1 > 0 && rise2 > 0 && rise3 > 0 && rise4 > 0) {
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
}

function drawMountains(Ma, Mb, Mc, Me) {
  background(255);
  strokeWeight(3);
  for (j = 0; j < 12; j++) {
    for (i = 0; i < 800; i++) {
      stroke(Ma, Mb, Mc, 9);
      noiseValueM = noise(mountainShape * i + 1000 * j);
      let M = map(noiseValueM, 0, 1, 0, 50 + j * 50);
      line(i, 500, i, M);
    }
  }
}

function drawCreature(Ca, Cb, Cc, movingSpeed, breakBoundary, scaleC) {
  push();
  let noiseValueA = noise(0.5*movingSpeed * frameCount);
  let noiseValueB = noise(0.5*movingSpeed * frameCount + 44444);
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

function drawBuilding(h1, h2, h3, h4) {
  push();
  building(h1, 250);
  building(h2, 400);
  building(h3, 600);
  building(h4, 800);
  pop();
}

function building(H, area) {
  push();
  translate(0, H);
  if (build == true) {
    if (sin(frameCount) >= 0) {
      buildingColor = b - 50;
    } else {
      buildingColor = 255;
    }
  } else buildingColor = b - 50;
  fill(buildingColor);
  noStroke();
  for (i = area - 250; i <= area; i += 50) {
    buildingStart = 200;
    let noiseValueHeight = noise(i + 10000);
    let heightRandom = map(noiseValueHeight, 0, 1, 0, 60);
    let noiseValueBuilding = noise(i);
    let noiseValueB = map(noiseValueBuilding, 0, 1, 0, 50);
    let noiseValueWidth = noise(i + 20000);
    let widthRandom = map(noiseValueWidth, 0, 1, 0, 30);
    rect(i + noiseValueB, buildingStart + heightRandom, buildingWidth, 500);
    rect(
      i + noiseValueB,
      buildingStart + 2 * heightRandom,
      buildingWidth + widthRandom,
      500
    );
    rect(
      i + noiseValueB,
      buildingStart + 3 * heightRandom,
      buildingWidth + 2 * widthRandom,
      500
    );
    rect(
      i + noiseValueB,
      buildingStart + 7 * heightRandom,
      buildingWidth + 3 * widthRandom,
      500
    );
    rect(i + noiseValueB, 425 + heightRandom, 50, 100);
    rect(0, 475, 800, 50);
  }
  pop();
}
