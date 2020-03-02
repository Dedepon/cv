//------------
// Functions -
//------------
	
// Main setup function
function setup() {

	// Add background
	let backgroundTexture = TextureCache["background"];
	background = new TilingSprite(backgroundTexture, backgroundTexture.baseTexture.width, backgroundTexture.baseTexture.height);
	
	background.scale.set(applicationHeight / background.height, applicationHeight / background.height);
	
	background.position.set(0, 0);
	background.tilePosition.set(0, 0);
	
	background.vx = backgroundBaseMovement;
	background.vy = 0;
	
	pApp.stage.addChild(background);

	// Add clouds
	let cloudsTexture = TextureCache["clouds"];
	clouds = new TilingSprite(cloudsTexture, cloudsTexture.baseTexture.width, cloudsTexture.baseTexture.height);
	
	clouds.scale.set(applicationHeight / clouds.height, applicationHeight / clouds.height);
	
	clouds.position.set(0, 0);
	clouds.tilePosition.set(0, 0);
	
	clouds.vx = cloudsBaseMovement;
	clouds.vy = 0;
	
	pApp.stage.addChild(clouds);
	
	// Add midground
	let midgroundTexture = TextureCache["midground"];
	midground = new TilingSprite(midgroundTexture, midgroundTexture.baseTexture.width, midgroundTexture.baseTexture.height);
	
	midground.scale.set(applicationHeight / midground.height, applicationHeight / midground.height);
	
	midground.position.set(0, 0);
	midground.tilePosition.set(0, 0);
	
	midground.vx = midgroundBaseMovement;
	midground.vy = 0;
	
	pApp.stage.addChild(midground);
	
	// Add foreground
	let foregroundTexture = TextureCache["foreground"];
	foreground = new TilingSprite(foregroundTexture, foregroundTexture.baseTexture.width, foregroundTexture.baseTexture.height);
	
	foreground.scale.set(applicationHeight / midground.height, applicationHeight / midground.height);
	
	foreground.position.set(applicationWidth / 2, applicationHeight - foregroundTexture.baseTexture.height / 2);
	foreground.tilePosition.set(0, 0);
	
	foreground.vx = foregroundBaseMovement;
	foreground.vy = 0;
	
	pApp.stage.addChild(foreground);

	// Add cat sprite
	let catTexture = TextureCache["cat"];
	catSprite = new Sprite(catTexture);

	// Make cat "on the ground"
	catSprite.y = pApp.view.height - catSprite.height - foregroundTexture.baseTexture.height / 2;
	catSprite.x = pApp.view.width / 2 - catSprite.width / 2;

	catSprite.vx = 0;
	catSprite.vy = 0;

	pApp.stage.addChild(catSprite);

	// Capture the keyboard arrow keys
	let left = keyboard("ArrowLeft");
	let right = keyboard("ArrowRight");

	// Left
	left.press = () => {
		if (!right.isDown) {
			// catSprite.vx = -5;
			background.vx = backgroundBaseMovement - backgroundAndCloudMovement;
			clouds.vx = cloudsBaseMovement - backgroundAndCloudMovement;
			midground.vx = midgroundBaseMovement - midgroundMovement;
			foreground.vx = foregroundBaseMovement - foregroundMovement;
		} else {
			// catSprite.vx = 0;	
			background.vx = backgroundBaseMovement;
			clouds.vx = cloudsBaseMovement;
			midground.vx = midgroundBaseMovement;
			foreground.vx = foregroundBaseMovement;
		}
	};

	left.release = () => {
		if (!right.isDown) {
			// catSprite.vx = 0;
			background.vx = backgroundBaseMovement;
			clouds.vx = cloudsBaseMovement;
			midground.vx = midgroundBaseMovement;
			foreground.vx = foregroundBaseMovement;
		} else {
			// catSprite.vx = 5;
			background.vx = backgroundBaseMovement + backgroundAndCloudMovement;
			clouds.vx = cloudsBaseMovement + backgroundAndCloudMovement;
			midground.vx = midgroundBaseMovement + midgroundMovement;
			foreground.vx = foregroundBaseMovement + foregroundMovement;
		}
	};

	// Right
	right.press = () => {
		if (!left.isDown) {
			// catSprite.vx = 5;
			background.vx = backgroundBaseMovement + backgroundAndCloudMovement;
			clouds.vx = cloudsBaseMovement + backgroundAndCloudMovement;
			midground.vx = midgroundBaseMovement + midgroundMovement;
			foreground.vx = foregroundBaseMovement + foregroundMovement;
		} else {
			// catSprite.vx = 0;
			background.vx = backgroundBaseMovement;
			clouds.vx = cloudsBaseMovement;
			midground.vx = midgroundBaseMovement;
			foreground.vx = foregroundBaseMovement;
		}
	};
	right.release = () => {
		if (!left.isDown) {
			// catSprite.vx = 0;
			background.vx = backgroundBaseMovement;
			clouds.vx = cloudsBaseMovement;
			midground.vx = midgroundBaseMovement;
			foreground.vx = foregroundBaseMovement;
		} else {
			// catSprite.vx = -5;
			background.vx = backgroundBaseMovement - backgroundAndCloudMovement;
			clouds.vx = cloudsBaseMovement - backgroundAndCloudMovement;
			midground.vx = midgroundBaseMovement - midgroundMovement;
			foreground.vx = foregroundBaseMovement - foregroundMovement;
		}
	};
	
	// Set the game state
	state = play;
	
	// Start the game loop 
	requestAnimationFrame(mainLoop)
	
	// Keep it for future reference
	// add title
	// style = new TextStyle({
	// 	fontFamily: "Arial",
	// 	fontSize: 36,
	// 	fill: "white",
	// 	stroke: '#0033ff',
	// 	strokeThickness: 4,
	// 	dropShadow: true,
	// 	dropShadowColor: "#000000",
	// 	dropShadowBlur: 4,
	// 	dropShadowAngle: Math.PI / 6,
	// 	dropShadowDistance: 6,
	// });
	// title = new Text("Welcome !!!", style);
	// title.x = pApp.view.width / 2 - title.width / 2;
	// title.y = 48;
	// pApp.stage.addChild(title);
	
	// let up = keyboard("ArrowUp");
	// let down = keyboard("ArrowDown");

	// Up
	// up.press = () => {
	// 	if (!down.isDown) {
	// 		catSprite.vy = -5;
	// 	} else {
	// 		catSprite.vy = 0;
	// 	}
	// };
	// up.release = () => {
	// 	if (!down.isDown) {
	// 		catSprite.vy = 0;
	// 	} else {
	// 		catSprite.vy = 5;
	// 	}
	// };

	// Down
	// down.press = () => {
	// 	if (!up.isDown) {
	// 		catSprite.vy = 5;
	// 	} else {
	// 		catSprite.vy = 0;
	// 	}
	// };
	// down.release = () => {
	// 	if (!up.isDown) {
	// 		catSprite.vy = 0;
	// 	} else {
	// 		catSprite.vy = -5;
	// 	}
	// };
}

// Main loop function
function mainLoop() {
	// Update the current game state:
	state();
	
	requestAnimationFrame(mainLoop);
}

// Play state function
function play() {
	// Use sprites's velocity to make them move
	catSprite.x += catSprite.vx;
	catSprite.y += catSprite.vy;
	clouds.tilePosition.x += clouds.vx;
	background.tilePosition.x += background.vx;
	midground.tilePosition.x += midground.vx;
}

//--------------------
// Application start -
//--------------------

// Create a Pixi pApplication
let pApp = new application({ 
	width: applicationWidth, 
	height: applicationHeight,                       
	antialias: true, 
	transparent: true, 
	resolution: 1
});

// Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(pApp.view);

// Define global variables
let catSprite;
let state;
let title;
let style;
let background;
let clouds;
let midground;
let foreground;

// Load the images files and run the `setup` function when it's done
loader
	.add("cat", "./resources/images/cat.png")
	.add("background", "./resources/images/background.png")
	.add("clouds", "./resources/images/clouds.png")
	.add("midground", "./resources/images/midground.png")
	.add("foreground", "./resources/images/foreground.png")
	.load(setup);