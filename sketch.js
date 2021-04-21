var balloon1,balloonImage1,balloonImage2;

// create database and position variable here
var database,position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  //console.log(database);
  createCanvas(1500,700);

  balloon1=createSprite(250,450,150,150);
  balloon1.addAnimation("hotAirBalloon",balloonImage1);
  balloon1.scale=0.5;

 

  var balloon1Position = database.ref('balloon/position');
  balloon1Position.on("value",readPosition,showError);
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(position !== undefined){


  if(keyDown(LEFT_ARROW)){
    balloon1.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon1.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    writePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon1.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
writePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    balloon1.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    writePosition(0,1);
  }

  drawSprites();
}
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function writePosition(x,y){
  database.ref('balloon/position').set({
  'x': position.x + x, 
  'y': position.y + y    
  })
}

function readPosition(data){
position= data.val();
//console.log(position.x);
balloon1.x = position.x;
balloon1.y = position.y;    
}

function showError(){
console.log("error in writing to database");    
}
