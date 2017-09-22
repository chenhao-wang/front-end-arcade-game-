// to show score
let score = 0;
let scoreDisplay = $('#playerScore');
scoreDisplay.html(score);

// slider to set speed
let slider = document.getElementById("myRange");
let output = document.getElementById("speed");
output.innerHTML = slider.value;
slider.oninput = function() {
  output.innerHTML = this.value;
}

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
    	// set the enemy speed
        this.x += (slider.value * dt);
    } else {
        this.x = -100;
    }
    // Vehicle-player collisions happen
    if (this.x < player.x + 60 && this.x > player.x - 60 && this.y < player.y + 60 && this.y > player.y - 60) {
        score = 0;
        scoreDisplay.html(score);
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Enemy{
	constructor() {
		super();
		this.sprite = 'images/char-horn-girl.png';
    	this.x = 200;
    	this.y = 320;
	}

	update() {
    	if (this.y < 20) {
        	score++;
        	scoreDisplay.html(score);
        	this.reset();
    	}
	}

	handleInput(direction) {
	    if(direction == 'left' && this.x > 0) {
	        this.x -= 101;
	    }
	    if(direction == 'right' && this.x < 400) {
	        this.x += 101;
	    }
	    if(direction == 'up' && this.y > 3) {
	        this.y -= 83;
	    }
	    if(direction == 'down' && this.y < 400) {
	        this.y += 83;
	    }
	}

	reset() {
	    this.x = 200;
	    this.y = 320;
	}
}

// Now instantiate your objects.
var enemy1 = new Enemy(-500, 60);
var enemy2 = new Enemy(-300, 60);
var enemy3 = new Enemy(-100, 60);
var enemy4 = new Enemy(-50, 140);
var enemy5 = new Enemy(-250, 140);
var enemy6 = new Enemy(-450, 140);
var enemy7 = new Enemy(-980, 230);
var enemy8 = new Enemy(-1, 230);
var enemy9 = new Enemy(-200, 230);
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6,enemy7, enemy8, enemy9];
// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
