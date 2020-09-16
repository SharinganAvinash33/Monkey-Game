var monkey, monkey_running, monkey_shocked;
var banana, bananaIm, bananaGroup;
var obstacle, obstacleIm, obstacleGroup;
var survivalTime = 0;
var bground, bgroundIm;
var invisibleGround;
var Play = 1;
var End = 0;
var gameState = Play;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaIm = loadImage("banana.png");
  obstacleIm = loadImage("obstacle.png");

  monkey_shocked = loadImage("sprite_0.png");
  obstacleGroup = new Group();
  bananaGroup = new Group();


}



function setup() {
  createCanvas(600, 300);

  monkey = createSprite(300, 250, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("shocked", monkey_shocked);
  monkey.scale = 0.1;


  invisibleGround = createSprite(300, 290, 600, 20);
  invisibleGround.visible = false;


}


function draw() {
  background(220);
  if (gameState === Play) {
    if (frameCount % 100 === 0) {
      goBananas();
      banana.velocityX = -3;
      banana.depth = monkey.depth - 1;
    }
    
    survivalTime = survivalTime + Math.round(getFrameRate() / 60);

    if (frameCount % 300 === 0) {
      spawnObstacles();
      obstacle.velocityX = -3;

    }
    if (keyDown("up") && monkey.y > 249) {

      monkey.velocityY = -11;

    }
    if (bananaGroup.isTouching(monkey)) {
      //survivalTime = survivalTime + 1;
      banana.destroy();
    }

    if (obstacleGroup.isTouching(monkey)) {
      gameState = End;
      monkey.velocityX = 0;

      monkey.velocityY = 0;
    }
  } else if (gameState === End) {
    bananaGroup.setLifetimeEach(-1);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    monkey.changeAnimation("shocked", monkey_shocked);
    fill("red");
    textSize(20);
    text.depth = banana.depth - 1;
    text("Game Over", 250, 150);
  }
  monkey.velocityY = monkey.velocityY + 0.5;
  monkey.collide(invisibleGround);


  drawSprites();
  fill("black");
  textSize(20);
  
  text("Survival Time=" + survivalTime, 250, 20);
}


function goBananas() {
  banana = createSprite(600, Math.round(random(120, 200)), 20, 20);
  bananaGroup.add(banana);

  banana.addImage(bananaIm);

  banana.scale = 0.1;

  banana.lifeTime = 200;

  banana.setCollider("rectangle", 0, 0, banana.width, 300);
  //banana.debug=true;
}

function spawnObstacles() {
  obstacle = createSprite(600, 260, 20, 20);
  obstacle.addImage(obstacleIm);
  obstacle.scale = 0.1;
  obstacle.lifeTime = 200;
  obstacleGroup.add(obstacle);


}