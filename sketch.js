var ball, db, position;

function setup(){
    createCanvas(500,500);

    db = firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
 
    var location = db.ref("ball/position");
    location.on("value",read,showerr);

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

function changePosition(X, Y){
    db.ref("ball/position").set({
        x : position.x + X,
        y : position.y + Y
    });
    
}

function read(rd){
    position = rd.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showerr(){
    console.log("Error")
}


/*
.ref() - Refers to the location of the database value we want

.on() - READ --> creates a listener which keeps listening to the changes in the database
        1. To read/store from the database
        2. To show us error if there is any problem in database

.set() - WRITE --> update/change the database value
*/
