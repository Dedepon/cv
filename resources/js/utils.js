// ---------
// Aliases -
// ---------

let application = PIXI.Application;
let Container = PIXI.Container;
let loader = PIXI.loader;
let resources = PIXI.loader.resources;
let TextureCache = PIXI.utils.TextureCache;
let Sprite = PIXI.Sprite;
let Text = PIXI.Text;
let TextStyle = PIXI.TextStyle;
let TilingSprite = PIXI.extras.TilingSprite;
let Rectangle = PIXI.Rectangle;

// -----------------
// Utils functions -
// -----------------

// Gives a random integer
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Keyboard manager
function keyboard(value) {
	let key = {};
	key.value = value;
	key.isDown = false;
	key.isUp = true;
	key.press = undefined;
	key.release = undefined;
	
	// The down event handler
	key.downHandler = event => {
		if (event.key === key.value) {
			if (key.isUp && key.press) key.press();
			key.isDown = true;
			key.isUp = false;
			event.preventDefault();
		}
	};

	// The up event handler
	key.upHandler = event => {
		if (event.key === key.value) {
			if (key.isDown && key.release) key.release();
			key.isDown = false;
			key.isUp = true;
			event.preventDefault();
		}
	};

	// Attach event listeners
	const downListener = key.downHandler.bind(key);
	const upListener = key.upHandler.bind(key);

	window.addEventListener(
		"keydown", downListener, false
	);
	window.addEventListener(
		"keyup", upListener, false
	);

	// Detach event listeners
	key.unsubscribe = () => {
		window.removeEventListener("keydown", downListener);
		window.removeEventListener("keyup", upListener);
	};

	return key;
}