// Enemies our player must avoid
class Enemy {
  constructor() {
      this.x = -150 // always set new enemy to start at -150
      this.y = Math.floor(Math.random() * 175) + 100 // generate random 'row' for enemy
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
  // Draw the enemy on the screen, required method for game
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // Reset enemy start position to fixed x value, random y value
  reset() {
    this.x = -100
    this.y = Math.floor(Math.random() * 175) + 150
  }
}

// Setting player constructor function
class Player {
  constructor() {
      this.x = 200
      this.y = 475
      this.score = 0
      this.sprite = 'images/bob-ross.png'
  }

  handleInput(inputKey) {

    if (inputKey === 'left' && this.x > 0) {
      this.x -= 100
    } else if (inputKey === 'right' && this.x < 400) {
      this.x += 100
    } else if (inputKey === 'down' && this.y < 450) {
      this.y += 100
    } else if (inputKey === 'up') {
        if (this.y < 0) {
          this.reset()
        } else {
        this.y -= 100
          }
    }
  }

  update() {
      checkCollision()
      if (this.y < 30) {
      this.score++
      this.reset()
      }
    }

  // Reset function to set player back to starting position
  reset() {
    this.x = 200
    this.y = 475
  }

  // Render player on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
    ctx.fillStyle = 'white'
    ctx.clearRect(170,15,1000,35)
    ctx.font = "20px Verdana"
    ctx.fillStyle = 'red'
      ctx.fillText(`Bob's Score: ${this.score}`,350, 45)


      // ctx.fillText(`Level: ${this.level}` 0, 45)

  }
}

var checkCollision = () => {
      //Iterate through allEnemies array. Reset if enemy within 40px.
      let lives = 3;
      for (let i = 0; i < allEnemies.length; i++) {
          if (Math.abs(player.x - allEnemies[i].x) <= 50) {
              if (Math.abs(player.y - allEnemies[i].y) <= 50) {
                  lives--
                  player.reset();

              }
          }
      }
  }
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = []
// While there are fewer than 4 bugs, create new enemy and push into allEnemies
while (allEnemies.length < 4) {
  allEnemies.push(new Enemy)
}
// Place the player object in a variable called player
var player = new Player()
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', e => {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// // Enemies our player must avoid
// var Enemy = function() {
//     this.x = -150 // always set new enemy to start at -150
//     this.y = Math.floor(Math.random() * 175) + 100 // generate random 'row' for enemy
//     this.speed = Math.floor((Math.random() * 200) + 50) // generate random speed
//     this.sprite = 'images/paint-palette.png'
// };
//
// Enemy.prototype.update = function(dt) {
//     // keeps the enemy moving until it crosses off screen, then resets position
//     if(this.x <= 500) {
//       this.x += this.speed * dt
//     } else {
//       this.reset()
//     }
// }
// // Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// }
// // Reset enemy start position to fixed x value, random y value
// Enemy.prototype.reset = function() {
//   this.x = -100
//   this.y = Math.floor(Math.random() * 175) + 150
// }
// // Setting player constructor function
// var Player = function() {
//     this.x = 200
//     this.y = 475
//     this.score = 0
//     this.sprite = 'images/bob-ross.png'
// }
//
// Player.prototype.handleInput = function(inputKey) {
//
//   if (inputKey === 'left' && this.x > 0) {
//     this.x -= 100
//   } else if (inputKey === 'right' && this.x < 400) {
//     this.x += 100
//   } else if (inputKey === 'down' && this.y < 450) {
//     this.y += 100
//   } else if (inputKey === 'up') {
//       if (this.y < 0) {
//         this.reset()
//       } else {
//       this.y -= 100
//         }
//   }
// }
//
// Player.prototype.update = function() {
//     checkCollision()
//     if (this.y < 30) {
//     this.score++
//     this.reset()
//     }
//   }
//
// var checkCollision = function() {
//       //Iterate through allEnemies array. Reset if enemy within 40px.
//       var lives = 3
//       for (var i = 0; i < allEnemies.length; i++) {
//           if (Math.abs(player.x - allEnemies[i].x) <= 50) {
//               if (Math.abs(player.y - allEnemies[i].y) <= 50) {
//                   lives--
//                   player.reset();
//
//               }
//           }
//       }
//   }
// // Reset function to set player back to starting position
// Player.prototype.reset = function() {
//   this.x = 200
//   this.y = 475
// }
// // Render player on the screen
// Player.prototype.render = function() {
//   ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
//   ctx.fillStyle = 'white'
// 	ctx.clearRect(170,15,1000,35)
//   ctx.font = "20px Verdana"
//   ctx.fillStyle = 'red'
//     ctx.fillText("Bob's Score: " + this.score,350, 45)
//
// }
// // Now instantiate your objects.
// // Place all enemy objects in an array called allEnemies
// var allEnemies = []
// // While there are fewer than 4 bugs, create new enemy and push into allEnemies
// while (allEnemies.length < 4) {
//   allEnemies.push(new Enemy)
// }
// // Place the player object in a variable called player
// var player = new Player()
// // This listens for key presses and sends the keys to your
// // Player.handleInput() method. You don't need to modify this.
// document.addEventListener('keyup', function(e) {
//     var allowedKeys = {
//         37: 'left',
//         38: 'up',
//         39: 'right',
//         40: 'down'
//     };
//
//     player.handleInput(allowedKeys[e.keyCode]);
// });
