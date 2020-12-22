//Create variables here
var dog, happyDog, milk ,database, foodS, foodStock;
var dog_img, happyDog_img, milk_img;

function preload()
{
  //load images here
  dog_img=loadImage("images/dogImg.png");
  happyDog_img=loadImage("images/dogImg1.png");
  milk_img=loadImage("images/milk.png");
  }

function setup() {
  database=firebase.database();
    //fetching stock from DB
    foodStock=database.ref("Food");
    foodStock.on("value",readStock,showError);
      console.log(foodStock)


  createCanvas(500, 500);
  dog=createSprite(250,300);
  dog.addImage(dog_img);
  dog.scale=0.2;

  milk=createSprite(200,340);
  milk.addImage(milk_img);
  milk.scale=0.09;
  milk.visible=false;

  
}

function draw() {  

  background("brown");

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDog_img);
    milk.visible=true;
  }

  if(keyWentUp(UP_ARROW))
  {
    dog.addImage(dog_img);
    milk.visible=false;
  }

 
  //To draw the sprites
  drawSprites();
  

  strokeWeight(2);
  stroke("black")
  textSize(24);
  fill("white");
  text("Food Remaining : "+foodS,130,140);
  textSize(20);
  text("NOTE: Press UP ARROW Key To Feed Rusty Milk!",25,50);

  //To tell user that now drago is happy 
  if(foodS%2===0)
  {
    textSize(24);
    text("Great! Rusty is Happy",140,450);
  }

  //to let the user wait for sometime to fetch data from DB
  if(foodS===undefined)
  {
    textSize(25);
    text("Loading..........",170,430);
  }

  if(foodS===0)
  {
  
    foodS=20;
  }

}

//function to read value from database
function readStock(data)
{ 
  foodS=data.val();
}

//writing stock to DB
function writeStock(x)
{
  
  if(x<=0)
  {
    x=0;
  }
  else
  {
    x=x-1;
  }

  database.ref('/').set(
    {
      Food:x
    }
  )

}

function showError()
{
  text("Server is not working, Try again later!",200,200);
}





  