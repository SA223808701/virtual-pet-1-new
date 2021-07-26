//Create variables here
var dog,sadDog,happydog;

var foodS,foodStock;
var fedTime,lastFed,feed,addFood;
var foodObj;

function preload()
{

	//load images here
  sadDog = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database()

  foodObj = new Food();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);


   dog = createSprite(250,250, 70,70);
  dog.addImage(sadDog);


  feed = createButton("Feed the Dog");
  feed.position(430,200);
  feed.mousePresed(feedDog);
  
  addFood = createButton("Add food");
  addFood.position(100,200);
  addFood.mousePresed(addFoods);
  
}


function draw() {  

  background(46,139,87);

  foodObj.display();

  fedTime = database.ref('Feed Time');
  fedTime.on("value", function(data){
    lastFed = data.val();

  })

 fill(150,234,216);
 textSize(15);

 if(lastFed >= 12){
  text("Last Feed:" +lastFed%12+ "PM", 350,30 );

 }
    else if(lastFed == 0){
      text("Last Feed: 12AM", 350,30)


    }
    else{
    text("Last Feed: " + lastFed +"AM", 350,30);


    }







  





  drawSprites();

  //add styles here



}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);



}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref('/').update({
Food:foodObj.getFoodStock(),
FeedTime : hour()

})


}

function addFoodS(){
foodS++;
database.ref('/').update({
Food:foodS

})


}




