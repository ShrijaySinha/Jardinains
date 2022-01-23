var paddle;
var ball,ballImg;
var edges;
var brickGroup;
var score=0;
var lives=3;

var gameState="serve";

var bg,bgImg;

function preload(){
  ballImg=loadImage("ball.png");
  //bgImg=loadImage("confetti.gif");
}

function setup() {
  createCanvas(800,400);

  paddle=createSprite(400, 350, 100, 10);

  ball=createSprite(400,270,10,10);
  ball.addImage(ballImg);
  ball.scale=0.05;

  edges=createEdgeSprites();

  brickGroup=new Group();
  bricks(65);
  bricks(95);
  bricks(125);
  bricks(155);
}

function draw() {
  background(0);
  
  paddle.x=mouseX;
  paddle.shapeColor="green";
 
  ball.bounceOff(edges[0]);
  ball.bounceOff(edges[1]);
  ball.bounceOff(edges[2]);
  ball.bounceOff(paddle);
  ball.bounceOff(brickGroup,brickHit);
 
  textSize(20);
  stroke("white");
  fill ("white");
  text("Score= "+score,700,40);
  text("Lives= "+lives,700,60);
  
  if(gameState==="serve"){
    textSize(20);
    fill("white");
    text("CLICK TO SERVE THE BALL",290,220);
  }
  if(gameState==="play"){
   if(ball.y>400){
    lifeOver()
  }
  }
  if(gameState==="end"){
    textSize(20);
    fill("white");
    text("GAME OVER",350,200);
    paddle.remove();
  }
  drawSprites();

  if(!brickGroup[0]){
    textSize(20);
    bg=createImg("confetti.gif");
    bg.position(17,9);
    bg.size(bg.width*2.2,bg.height*1);
    fill("orange");
    stroke("white");
    text("CONGRATULATION! YOU WON THE GAME",200,200);
    ball.remove();
    
  }
}

function mouseClicked(){
  
  if(gameState==="serve"){
    ball.velocityY=10;
    ball.velocityX=10;
  gameState="play";
  }
}

function bricks(y){
  for(var c=0;c<12;c++){
    var brick=createSprite(65+55*c,y,50,25);
    brickGroup.add(brick);
    brick.shapeColor=color(random(255),random(255),random(255));
  }
}
function brickHit(ball,brick) {
  brick.remove();
  score=score+1;
  }
function lifeOver(){
   lives=lives-1;
   if(lives>=1){
     gameState="serve";
     ball.x=400;
     ball.y=270;
     ball.velocityX=0;
     ball.velocityY=0;
   }
   else{
     gameState="end";
   }
  }