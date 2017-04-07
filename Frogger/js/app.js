// Render all objects at beginning of program
Object.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  ctx.fillStyle = 'white' // render score and lives on top of screen
  ctx.clearRect(0,0,1000,50) // Clear rectangle at top of canvas
  ctx.font = "30px Courier"
  ctx.fillStyle = 'red'
  ctx.fillText(`BOBS LEFT: ${this.lives}`, 0, 45)
  ctx.fillStyle = 'orange'
  ctx.fillText(`SCORE: ${this.score}`, 350, 45)
// Show game over message when no lives left, reload page
  if (this.lives <= 0) {
    ctx.font = "100px Courier"
    ctx.fillStyle = 'red'
    ctx.fillText(`RIP BOB`,45, 400)
    setTimeout(function() {
      window.location.reload()
    }, 2000)
  } // Show message at beginning of game, while player has 3 lives
  if (this.lives === 3) {
    ctx.font = "35px Courier"
    ctx.fillStyle = 'white'
    ctx.fillText(`DON\'T LET BOB GET HIT!`, 25, 100)
  } // Show message warning 1 life left
  if (this.lives === 1) {
    ctx.font = "35px Courier"
    ctx.fillStyle = 'white'
    ctx.fillText(`BOB HAS 1 MORE CHANCE!`,25, 100)
  }
}
// Enemies our player must avoid
class Palette {
  constructor(x, y) {
      this.x = -150 // always set new enemy to start at -150
      this.y = Math.floor(Math.random() * (475 - 350)) + 350 // generate random 'row' for enemy
      this.speed = Math.floor((Math.random() * 200) + 50) // generate random speed
      this.sprite = 'images/paint-palette.png'
  }

  update(dt) {
      // keeps the enemy moving until it crosses off screen, then resets position
      if(this.x <= 500) {
        this.x += this.speed * dt
      } else {
        this.reset()
      }
  }

  reset() {
    this.x = -100
    this.y = Math.floor(Math.random() * (475 - 350)) + 350
  }
}

class Paintbrush {
  constructor() {
    this.x = 600
    this.y = Math.floor(Math.random() * (350 - 200)) + 200
    this.speed = Math.floor((Math.random() * 200) + 50)
    this.sprite = 'images/paintbrush.png'
  }

  update(dt) {
    // Keeps the enemy moving until it crosses off screen, then resets position
    if(this.x >= -100) {
      this.x -= this.speed * dt
    } else {
      this.reset()
    }
  }
    // Reset paintbrushes when they go off the screen, generate
  reset() {
    this.x = 600
    this.y = Math.floor(Math.random() * (350 - 200)) + 200
  }
}
// Setting player constructor function
class Player {
  constructor() {
    this.x = 200
    this.y = 625
    this.score = 0
    this.level = 1
    this.lives = 3
    this.sprite = 'images/bob-ross.png'
  }
//
  handleInput(e) {
    if (e === 'left' && this.x > 0) {
      this.x -= 50
    } else if (e === 'right' && this.x < 400) {
      this.x += 50
    } else if (e === 'down' && this.y < 600) {
      this.y += 50
    } else if (e === 'up') {
        if (this.y < 0) {
          this.reset()
        } else {
        this.y -= 50
          }
    }
  }
  // See if any collisions happened. Give 1 point and reset if player reaches other side.
  update() {
    this.checkCollision()
    if (this.y < 100) {
      this.score++
      this.reset()
    }
    }
  //Iterate through allEnemies and allPaintbrush arrays. Reset if enemy hits either.
  checkCollision() {
    for (let i = 0; i < allEnemies.length; i++) {
        if (Math.abs(player.x - allEnemies[i].x) <= 50) {
          if (Math.abs(player.y - allEnemies[i].y) <= 50) {
            player.lives--
            player.reset()
          }
        }
    }
    for (let i = 0; i < allPaintbrush.length; i++) {
        if (Math.abs(player.x - allPaintbrush[i].x) <= 100) {
          if (Math.abs(player.y - allPaintbrush[i].y) <= 30){
            player.lives--
            player.reset()
          }
        }
    }
  }
  // Reset function to set player back to starting position
  reset() {
    this.x = 200
    this.y = 625
  }
}
// Place all enemy objects in an array called allEnemies
var allEnemies = []
while (allEnemies.length < 3) { // While there are fewer than 4 bugs, create new enemy and push into allEnemies
  allEnemies.push(new Palette())
}

var allPaintbrush = [] // Place the player object in a variable called player

while (allPaintbrush.length < 3) {
  allPaintbrush.push(new Paintbrush)
}

var player = new Player() // Create instance of player

document.addEventListener('keyup', e => { // Player.handleInput() method. You don't need to modify this.
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
