var ball;
var database,position
function setup(){
    createCanvas(500,500);
    database=firebase.database()
    //STEP 1: .ref() is used to refer to the position in database
    var location = database.ref("ball/position")
    //STEP 2: LISTENER: to set the listener we used .on()
    location.on("value",read )

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
}
function read(data){
    //.val()- helps us to read the data
    position=data.val();
    ball.x = position.x;
    ball.y = position.y;
}
function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
//write to database
//STEP 1: - .ref()
//step2: .set()- for setting the vaue firt time or use .update()
database.ref("ball/position").set({
    x:ball.x+x,
    y: ball.y+y})
}


/* DATABASE
2 major operation: read and write
    1) READ:
        step 1: .ref() - refer to the position
        step 2: .on()- listen to the "value" and perform a function

    2) WRITE:
        step 1: .ref()
        step 2:.set() or update() 
*/