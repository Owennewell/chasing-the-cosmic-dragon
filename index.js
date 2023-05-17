// Set up canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 600;


// Initialize high score
let highScore = 0;

let pipesPassed = 0; // initialize the count of passed pipes

//CHASING THE DRAGON
const dragonImg = new Image();
dragonImg.src = "https://i.pinimg.com/originals/5d/27/09/5d27099922e5fa89a861563885703ace.gif";

const dragonX = 800; // X-coordinate of the dragon's position
let dragonY = 400; // Y-coordinate of the dragon's position
const dragonWidth = 100; // Width of the dragon image
const dragonHeight = 100; // Height of the dragon image
//CHASING THE DRAGON

// Move dragon up and down
let dragonAmplitude = 50; // Adjust the amplitude of the oscillation
let dragonFrequency = 0.01; // Adjust the frequency of the oscillation
let dragonPhase = 0; // Initial phase of the oscillation

function animateDragon() {
  dragonPhase += dragonFrequency;
  dragonY = canvas.height / 2 + Math.sin(dragonPhase) * dragonAmplitude;
  ctx.drawImage(dragonImg, dragonX, dragonY, dragonWidth, dragonHeight);
  requestAnimationFrame(animateDragon);
}

animateDragon();


// Bird properties
let birdX = 500;
let birdY = 500;
let birdImg = new Image();
birdImg.src = "https://freepngdownload.com/image/thumb/ufo-png-free-download-9.png"; // bird image goes here
let birdWidth = 20;
let birdHeight = 20;
let birdVelocity = 0;
let gravity = 0.5;

// Pipe properties
let pipeGap = 200;
let pipeFrequency = 500;
let pipes = [];
let pipeWidth = 50;
let pipeVelocity = 2;

// Canvas barrier properties
const barrierHeight = 0; // The height of the canvas barrier
const barrierWidth = canvas.width; // The width of the canvas barrier
const barrierY = canvas.height - barrierHeight; // The Y-coordinate of the canvas barrier

// Set up the canvas barrier
ctx.fillStyle = "#000000"; // Set the color of the canvas barrier to black
ctx.fillRect(0, barrierY, barrierWidth, barrierHeight); // Draw the canvas barrier

const buzzingSound = new Audio('file:///C:/Users/GodMo/Downloads/SF-ufo.mp3');
buzzingSound.addEventListener('canplay', function() {
  buzzingSound.loop = true;
  buzzingSound.play();
});

// Score
let score = 0;

// Increase velocity when bird passes through pipe
const increaseVelocity = 1; // adjust the amount of velocity increase here

// Load background image
const backgroundImage = new Image();
backgroundImage.src = "https://wallpaper-house.com/data/out/8/wallpaper2you_280651.jpg";
backgroundImage.onload = function() {

// Create buzzing sound object
const buzzingSound = new Audio('https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3');
buzzingSound.loop = true;

const fullscreenBtn = document.getElementById('fullscreen-btn');

fullscreenBtn.addEventListener('click', function() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
});


// Play buzzing sound
buzzingSound.play();
buzzingSound.volume = .9;


  // Start game loop once image is loaded
  gameLoop();
};
// backround properties
let backgroundX = 2;
const backgroundVelocity = 2;

// Main game loop
function gameLoop() {
  

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

   // Draw background image
   ctx.drawImage(backgroundImage, backgroundX, 0, canvas.width, canvas.height);
   ctx.drawImage(backgroundImage, backgroundX + canvas.width, 0, canvas.width, canvas.height);

// Draw high score box
drawHighScore();

// Draw the canvas barrier
ctx.fillStyle = "#000000";
ctx.fillRect(0, barrierY, barrierWidth, barrierHeight);


  // Draw bird
  ctx.drawImage(birdImg, birdX, birdY, birdWidth*2, birdHeight*2);



    // Draw pipes
    let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#4d4d4d');
    gradient.addColorStop(0.5, '#cccccc');
    gradient.addColorStop(1, '#4d4d4d');
    ctx.fillStyle = gradient;
    for (let i = 0; i < pipes.length; i++) {
      let pipe = pipes[i];
      ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
      ctx.fillRect(pipe.x, pipe.bottomY, pipeWidth, pipe.bottomHeight);
    }

// DRAW DRAGON
ctx.drawImage(dragonImg, dragonX, dragonY, dragonWidth, dragonHeight);


 // Move background
 backgroundX -= backgroundVelocity;
 if (backgroundX <= -canvas.width) {
   backgroundX = 0;
 }

  // Move bird
 // birdVelocity += gravity;
  birdY += birdVelocity;

  // Move pipes
  for (let i = 0; i < pipes.length; i++) {
    let pipe = pipes[i];
    pipe.x -= pipeVelocity;

    const explosionImg = new Image();
    explosionImg.onload = function() {
      // Image has loaded, can use it now
    };
    explosionImg.src = 'https://static.vecteezy.com/system/resources/thumbnails/012/629/348/small/fire-flames-explosion-png.png';
    let explosionWidth = 50;
    let explosionHeight = 50;

    function drawExplosion() {
      ctx.drawImage(explosionImg, birdX - (explosionWidth - birdWidth) / 2, birdY - (explosionHeight - birdHeight) / 2, explosionWidth, explosionHeight);
    }

    // Check for collision with pipes
    if (
      birdX + birdWidth > pipe.x &&
      birdX < pipe.x + pipeWidth &&
      (birdY < pipe.topHeight || birdY + birdHeight > pipe.bottomY)
    ) {
      drawExplosion();
      birdVelocity = 0;
      backgroundX = 2;
      pipeVelocity = 2;
      score = 0;
      
      // we need to make it reload everything by=ut the high score
         pipes = [];
   break;
    }

      // increment the pipesPassed counter
  pipesPassed++;

  // check if 50 pipes have been passed
  if (pipesPassed % 1 === 0) {
    // destroy all existing pipes
    const allPipes = document.querySelectorAll(".pipe");
    allPipes.forEach((pipe) => pipe.remove());
    
    // reset the pipesPassed counter to 0
   // pipesPassed = 0;
  }


    // Check for passing pipe
    if (birdX > pipe.x + pipeWidth && !pipe.passed) {
      score++;
      pipe.passed = true;

      if (score % 10 === 0) {
        pipeVelocity += increaseVelocity;
        //birdVelocity += increaseVelocity;
      }
    }
  }

  // Add new pipe
  if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - pipeFrequency) {
    let pipe = {};
    pipe.topHeight = Math.random() * (canvas.height - pipeGap);
    pipe.bottomY = pipe.topHeight + pipeGap;
    pipe.bottomHeight = canvas.height - pipe.bottomY;
    pipe.x = canvas.width;
    pipe.passed = false;
    pipes.push(pipe);
  }

  // Draw high score box
function drawHighScore() {
  ctx.fillStyle   = "white";
  ctx.fillRect(canvas.width - 150, 0, 150, 30);
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("High Score: " + highScore, canvas.width - 140, 20);
}
  // Update score
  ctx.fillStyle = "white";
ctx.fillRect(0, 0, 100, 30);
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  // Check for new high score
  if (score > highScore) {
    highScore = score;

    // Update high score box
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width - 150, 0, 150, 30);
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("High Score: " + highScore, canvas.width - 140, 25);
  }
  
  


  // keep UFO inside canvas
  if (birdY + birdHeight > canvas.height || birdY < 0) {
    birdVelocity = 0;
  }
  

  if (birdY + birdHeight >= canvas.height || birdY <= 0) {
    birdVelocity = 0;
    birdY = canvas.height/2 - birdHeight/2;
    birdX = canvas.width/2 - birdWidth/2;
  }
  
  
  

  // Request next frame
  requestAnimationFrame(gameLoop);
}

// End game function
function endGame() {
  alert("Game over! Your score was " + score);
  location.reload();
}

// Add event listener for key press
//document.addEventListener("keydown", function(event) {
  //if (event.code === "Space") {
   // birdVelocity = -10;
 // }
//});
// Handle bird movement on key press
document.addEventListener("keydown", function(event) {
  if (event.keyCode === 38) {
    birdVelocity = -8;
  }
});

document.addEventListener("keyup", function(event) {
  if (event.keyCode === 38) {
    birdVelocity = 0;
  }
});

document.addEventListener("keydown", function(event) {
  if (event.keyCode === 40) {
    birdVelocity = 8;
  }
});

document.addEventListener("keyup", function(event) {
  if (event.keyCode === 40) {
    birdVelocity = 0;
  }
});


// Start game
gameLoop();
