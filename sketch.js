var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running, trex_collided;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var score;
var cactusS1;
var cactusS2;
var cactusS3;
var cactusB1;
var cactusB2;
var cactus4;
var score=0;
var PLAY=1;
var END=0;
var gameState= PLAY;
var cloudGroup;
var obstacleGroup;
var textGameover;
var restartImage;
var die,checkPoint,jump;


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cactusS1=loadImage("obstacle1.png");
  cactusS2=loadImage("obstacle2.png");
  cactusS3=loadImage("obstacle3.png");
  
  cactusB1=loadImage("obstacle4.png");
  cactusB2=loadImage("obstacle5.png");
  cactus4=loadImage("obstacle6.png");
  
  textGameover=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  
  die=loadSound("die.mp3");
  
  checkPoint=loadSound("checkPoint.mp3");
  
  jump=loadSound("jump.mp3");
}


function setup() {
  createCanvas(600,200);
  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);  
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,40);
  //trex.debug="true";

  invisibleGround = createSprite(200,184,800,1);
  invisibleGround.visible=false;
  

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  cloudGroup=new Group();
  obstacleGroup=new Group();

  gameOver = createSprite(300,80);
  gameOver.addImage(textGameover);

  restart = createSprite(300,115);
  restart.addImage(restartImage);
  restart.scale = 0.6;
  
}
  
function draw() {
  background(180);
  
  textSize(15);
  text("Score: "+ score, 500,30);
  
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  trex.collide(invisibleGround);
  
  if(gameState === PLAY) {
    if (keyDown("space")&& trex.y>=160) {
      trex.velocityY = -13;
      jump.play();
      }

    trex.velocityY = trex.velocityY + 0.8
    ground.velocityX = -(5 + score/100);
    
    score = score + Math.round(getFrameRate()/50);

      restart.visible=false;
      gameOver.visible=false;
    
    if(score>0 && score%100===0) {
      checkPoint.play();
    }

    spawnClouds();
  
    spawnObstacles();
    
    if(obstacleGroup.isTouching(trex)) {
      
      gameState=END;
      die.play();
    }
  
  }
  
  else if(gameState === END) {
    ground.velocityX = 0;
    cloudGroup.setVelocityXEach(0);
    trex.addAnimation("trex_collided",trex_collided);
    trex.changeAnimation("trex_collided",trex_collided);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    trex.velocityY = 0;
    restart.visible=true;
    gameOver.visible=true;
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
}


function reset() {
  gameState=PLAY;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  score=0;
  trex.changeAnimation("running",trex_running);
}

function spawnClouds() {
  if(frameCount%60===0) {
    var cloud=createSprite(600,50,50,25);
    var cloudImage;
    cloudImage=loadImage("cloud.png");
    cloud.addImage(cloudImage);
    cloud.y=Math.round(random(1,50));
    cloud.scale=0.5;
    cloud.velocityX= -5;
    cloud.lifetime=120;
    cloudGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount%60===0) {
    var cactus=createSprite(600,160,10,40);
    cactus.velocityX=-(5 + score/100);
    cactus.lifetime=120;
    console.log(cactus.lifetime);  
    
    var rand = Math.round(random(1,6)); 
    switch(rand) { 
        case 1: cactus.addImage(cactusS1); 
        break; 
        case 2: cactus.addImage(cactusS2); 
        break; 
        case 3: cactus.addImage(cactusS3); 
        break; 
        case 4: cactus.addImage(cactusB1); 
        break; 
        case 5: cactus.addImage(cactusB2); 
        break; 
        case 6: cactus.addImage(cactus4); 
        break; 
        default: break; }
        cactus.scale=0.5;
        obstacleGroup.add(cactus);
        cactus.velocityX=-(5 + score/100);
  }
} 
  