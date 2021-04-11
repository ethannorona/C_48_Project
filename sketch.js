var player, enemy, edges, backgroundImg;
var dodgeball1, dodgeball2, dodgeballImg;
var playerHealth = 3, plrHealthB1, plrHealthB2, plrHealthB3; 
var enemyHealth = 3, emyHealthB1, emyHealthB2, emyHealthB3;

var gameState = "play";

function preload()
{
	backgroundImg = loadImage("download.jpg");
	dodgeballImg = loadImage("dodgeball.png");
}

function setup() {
	createCanvas(750, 700);

	player = createSprite(380, 550, 50, 50);
	enemy = createSprite(380, 150, 50, 50);
	player.shapeColor = "red";
	enemy.shapeColor = "blue";

	dodgeball1 = createSprite(380, 450, 30, 30);
	dodgeball2 = createSprite(380, 250, 30, 30);
	dodgeball1.addImage(dodgeballImg);
	dodgeball2.addImage(dodgeballImg);
	dodgeball1.scale = 0.13;
	dodgeball2.scale = 0.13;
	//dodgeball1.shapeColor = "darkOrange";
	//dodgeball2.shapeColor = "darkOrange";

	plrHealthB1 = createSprite(620, 605, 30, 30);
	plrHealthB1.shapeColor = "green";

	plrHealthB2 = createSprite(650, 605, 30, 30);
	plrHealthB2.shapeColor = "green";

	plrHealthB3 = createSprite(680, 605, 30, 30);
	plrHealthB3.shapeColor = "green";

	emyHealthB1 = createSprite(620, 100, 30, 30);
	emyHealthB1.shapeColor = "green";

	emyHealthB2 = createSprite(650, 100, 30, 30);
	emyHealthB2.shapeColor = "green";

	emyHealthB3 = createSprite(680, 100, 30, 30);
	emyHealthB3.shapeColor = "green";
}


function draw() {
  rectMode(CENTER);
  background(backgroundImg);

	if(gameState === "play"){

  edges = createEdgeSprites();
  player.bounceOff(edges);
  enemy.bounceOff(edges);
  
  keyPressed();

	if(playerHealth === 2){
		plrHealthB1.visible = false;
	}

	if(playerHealth === 1){
		plrHealthB1.visible = false;
		plrHealthB2.visible = false;
	}

	if(playerHealth === 0){
		plrHealthB1.visible = false;
		plrHealthB2.visible = false;
		plrHealthB3.visible = false;
		gameState = "end0";
	}

	if(enemyHealth === 2){
		emyHealthB1.visible = false;
	}

	if(enemyHealth === 1){
		emyHealthB1.visible = false;
		emyHealthB2.visible = false;
	}

	if(enemyHealth === 0){
		emyHealthB1.visible = false;
		emyHealthB2.visible = false;
		emyHealthB3.visible = false;
		gameState = "end1";
	}

  if(player.y < 360){
	  player.y += 7;
  }

  if(enemy.y > 325){
	enemy.y -= 7;
  }	

  if(dodgeball1.isTouching(dodgeball2)){
	dodgeball1.velocityY *= -1
	dodgeball2.velocityY *= -1
   }

	if(dodgeball1.isTouching(player) && dodgeball1.velocityY > 0){
		//gameState = "end0";
		playerHealth--;
		dodgeball1.x = 380;
		dodgeball1.y = 450;
		dodgeball1.velocityY = 0;
	}

	if(dodgeball2.isTouching(player) && dodgeball2.velocityY > 0){
		//gameState = "end0";
		playerHealth--;
		dodgeball2.x = 380;
		dodgeball2.y = 250;
		dodgeball2.velocityY = 0;
	}

	if(dodgeball1.isTouching(enemy) && dodgeball1.velocityY < 0){
		//gameState = "end1";
		enemyHealth--;
		dodgeball1.x = 380;
		dodgeball1.y = 450;
		dodgeball1.velocityY = 0;
	}

	if(dodgeball2.isTouching(enemy) && dodgeball2.velocityY < 0){
		//gameState = "end1";
		enemyHealth--;
		dodgeball2.x = 380;
		dodgeball2.y = 250;
		dodgeball2.velocityY = 0;
	}

	dodgeball1.collide(edges);
	dodgeball2.collide(edges);

  drawSprites();

  if(playerHealth > 0 || enemyHealth > 0){
	textSize(22);
	fill("blue");
	text("Health", 618, 80);
}

if(playerHealth > 0 || enemyHealth > 0){
	textSize(22);
	fill("red");
	text("Health", 618, 584);
}
}

if(gameState === "play"){
	textSize(20);
	fill("black");
	text("Red: Arrow keys to move. Hold 'N' when close to a non-moving", 20, 660);
	text("dodgeball to hold. Press 'M' to Release.", 20, 680);

	text("Blue: WSAD keys to move. Hold 'C' when close to a non-moving", 20, 30);
	text("dodgeball to hold. Press 'V' to Release.", 20, 50);

	text("Goal: Hit the other opponent.", 15,350);
}

if(gameState === "end0"){
	textSize(30);
	fill("black");
	text("Game Over", 280, 350);
	text("Blue Wins", 300, 380);
}

if(gameState === "end1"){
	textSize(30);
	fill("black");
	text("Game Over", 280, 350);
	text("Red Wins", 300, 380);
}

if(gameState === "end0" || gameState === "end1"){
	text("Press 'R' to reset", 260, 415);
	if(keyDown("r")){
		gameState = "play";
		
		playerHealth = 3;
		enemyHealth = 3;

		plrHealthB1.visible = true;
		plrHealthB2.visible = true;
		plrHealthB3.visible = true;

		emyHealthB1.visible = true;
		emyHealthB2.visible = true;
		emyHealthB3.visible = true;

		player.x = 380;
		player.y = 550;

		enemy.x = 380;
		enemy.y = 150;

		dodgeball1.x = 380;
		dodgeball1.y = 450;
		dodgeball1.velocityY = 0;

		dodgeball2.x = 380;
		dodgeball2.y = 250;
		dodgeball2.velocityY = 0;
	}
}

}

function keyPressed(){
	if(keyDown(RIGHT_ARROW)){
		player.x += 6;
	}
  
	if(keyDown(LEFT_ARROW)){
	  player.x -= 6;
	}
  
   if(keyDown(DOWN_ARROW)){
	  player.y += 6;
	}
  
   if(keyDown(UP_ARROW)){
	  player.y -= 6;
	}

	if(keyDown("d")){
		enemy.x += 6;
	}
  
	if(keyDown("a")){
		enemy.x -= 6;
	}
  
   if(keyDown("s")){
		enemy.y += 6;
	}
  
   if(keyDown("w")){
		enemy.y -= 6;
	}

	if(keyDown("n") && player.isTouching(dodgeball1)){
		dodgeball1.x = player.x;
		dodgeball1.y = player.y - 30;
		if(dodgeball1.isTouching(dodgeball2)){
			dodgeball1.x -= 30;
			dodgeball2.x += 30;
		}
		if(keyDown("m")){
			if(playerHealth === 3){
				dodgeball1.velocityY = -22;
			}
			if(playerHealth === 2){
				dodgeball1.velocityY = -24;
			}
			if(playerHealth === 1){
				dodgeball1.velocityY = -26;
			}
		}
	}

	if(keyDown("n") && player.isTouching(dodgeball2)){
		dodgeball2.x = player.x;
		dodgeball2.y = player.y - 30;
		if(dodgeball1.isTouching(dodgeball2)){
			dodgeball1.x -= 30;
			dodgeball2.x += 30;
		}
		if(keyDown("m")){
			if(playerHealth === 3){
				dodgeball2.velocityY = -22;
			}
			else if(playerHealth === 2){
				dodgeball2.velocityY = -24;
			}
			else if(playerHealth === 1){
				dodgeball2.velocityY = -26;
			}
		}
	}

	if(keyDown("c") && enemy.isTouching(dodgeball1)){
		dodgeball1.x = enemy.x;
		dodgeball1.y = enemy.y + 30;
		if(dodgeball1.isTouching(dodgeball2)){
			dodgeball1.x -= 30;
			dodgeball2.x += 30;
		}
		if(keyDown("v")){
			if(enemyHealth === 3){
				dodgeball1.velocityY = 22;
			}
			else if(enemyHealth === 2){
				dodgeball1.velocityY = 24;
			}
			else if(enemyHealth === 1){
				dodgeball1.velocityY = 26;
			}
		}
	}

	if(keyDown("c") && enemy.isTouching(dodgeball2)){
		dodgeball2.x = enemy.x;
		dodgeball2.y = enemy.y + 30;
		if(dodgeball1.isTouching(dodgeball2)){
			dodgeball1.x -= 30;
			dodgeball2.x += 30;
		}
		if(keyDown("v")){
			if(enemyHealth === 3){
				dodgeball2.velocityY = 22;
			}
			else if(enemyHealth === 2){
				dodgeball2.velocityY = 24;
			}
			else if(enemyHealth === 1){
				dodgeball2.velocityY = 26;
			}
		}
	}
}