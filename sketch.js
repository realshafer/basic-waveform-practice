let sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8, sound9, sound10, sound11, sound12;
let original1;
let questionButton, original1Button, answerButton, nextButton;
let player, fileName;
let answerRevealed = false;

function preload() {
  // Question pool
  sound1 = loadSound('assets/Bb4 Sin.mp3');
  sound2 = loadSound('assets/Bb4 Tri.mp3');
  sound3 = loadSound('assets/Bb4 Saw.mp3');
  sound4 = loadSound('assets/Bb4 Sq.mp3');
  sound5 = loadSound('assets/C3 Sin.mp3');
  sound6 = loadSound('assets/C3 Tri.mp3');
  sound7 = loadSound('assets/C3 Saw.mp3');
  sound8 = loadSound('assets/C3 Sq.mp3');
  sound9 = loadSound('assets/D1 Sin.mp3');
  sound10 = loadSound('assets/D1 Tri.mp3');
  sound11 = loadSound('assets/D1 Saw.mp3');
  sound12 = loadSound('assets/D1 Sq.mp3');
  // Originals
  // original1 = loadSound('assets/120-click.mp3');
}

function setup(){  
  createCanvas(windowWidth, windowHeight);
  background(0);
  textAlign(CENTER, CENTER);
  fill(255);

  // Title
  textSize(36);
  text("Basic Waveform Practice", width/2, height/9);

  // Subtitle
  textSize(20);
  text("Sine, Triangle, Sawtooth, Square", width/2, height/9 + 40);

  // --- Layout variables ---
  let rowH = 60;
  let col1X = width/4;
  let col2X = width/2;
  let startY = height/3;

  // QUESTION row
  createDiv("QUESTION")
    .position(col1X - 150, startY)
    .style("color","white").style("font-size","24px");
  questionButton = createButton("PLAY");
  styleButton(questionButton, col2X, startY, "#00E938");
  questionButton.mousePressed(toggleQuestion);

  // ANSWER row
  createDiv("ANSWER")
    .position(col1X - 150, startY + rowH)
    .style("color","white").style("font-size","24px");
  answerButton = createButton("REVEAL");
  styleButton(answerButton, col2X, startY + rowH, "#03A9F4");
  answerButton.mousePressed(showAnswer);

  // NEXT QUESTION button
  nextButton = createButton("NEXT QUESTION");
  nextButton.position(width/2 - 100, startY + rowH*2 + 20);
  nextButton.size(200, rowH);
  nextButton.style("font-size","20px");
  nextButton.style("background-color","#FFC107");
  nextButton.mousePressed(nextQuestion);

  // Pick first sound
  chooseSound();
}

// ---- Utility: style buttons consistently ----
function styleButton(btn, x, y, color) {
  btn.position(x, y);
  btn.size(120, 50);
  btn.style("font-size","20px");
  btn.style("background-color", color);
  btn.style("color","#000");
}

// ---- Toggle functions ----
function toggleQuestion() {
  if (player && player.isPlaying()) {
    player.stop();
    resetButton(questionButton, "PLAY", "#00E938");
  } else {
    stopAll();
    player.amp(0.8);
    player.loop();
    questionButton.html("STOP").style("background-color","#F80F05");
  }
}

function resetButton(btn, label, color) {
  btn.html(label);
  btn.style("background-color", color);
}

function stopAll(){
  if (player) player.stop();
  if (original1) original1.stop();
  resetButton(questionButton, "PLAY", "#00E938");
  resetButton(original1Button, "PLAY", "#00E938");
}

function showAnswer() {
  answerButton.html(fileName);
  answerRevealed = true;
}

function nextQuestion() {
  stopAll();
  chooseSound();
  resetButton(answerButton, "REVEAL", "#03A9F4");
  answerRevealed = false;
}

// ---- Random sound selection (no 3+ repeats) ----
let lastChoice = -1;
let secondLastChoice = -1;

function chooseSound() {
  let choice;
  do {
    choice = int(random(12));
  } while (choice === lastChoice && choice === secondLastChoice);

  secondLastChoice = lastChoice;
  lastChoice = choice;

  if (choice === 0) { player = sound1; fileName = "Sine"; }
  else if (choice === 1) { player = sound2; fileName = "Triangle"; }
  else if (choice === 2) { player = sound3; fileName = "Sawtooth"; }
  else if (choice === 3) { player = sound4; fileName = "Square"; }
  else if (choice === 4) { player = sound5; fileName = "Sine"; }
  else if (choice === 5) { player = sound6; fileName = "Triangle"; }
  else if (choice === 6) { player = sound7; fileName = "Sawtooth"; }
  else if (choice === 7) { player = sound8; fileName = "Square"; }
  else if (choice === 8) { player = sound9; fileName = "Sine"; }
  else if (choice === 9) { player = sound10; fileName = "Triangle"; }
  else if (choice === 10) { player = sound11; fileName = "Sawtooth"; }
  else { player = sound12; fileName = "Square"; }
}
