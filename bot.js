// 👋 Hello there! This file contains ready-to-edit bot code.
// 🟢 Open "README.md" for instructions on how to get started!
// TL;DR Run ./connect (or .\connect.cmd on Windows) to begin.

class Bot {
  constructor(config) {
    this.config = config;
    console.log("Hello world!", this.config);
  }

  move(paddle, ball) {
    // This prints the position of your paddle and the ball to the bot terminal.
    // Use these values to determine which direction your paddle should move so
    // you hit the ball!
    console.log("paddle", paddle.x, paddle.y);
    console.log("ball", ball.x, ball.y);

    // Return the direction you'd like to move here:
    // "north" "south" "east" "west" or "none"
    return "none";
  }

  end(paddle, ball) {
    console.log("Good game!");
  }
}

module.exports.Bot = Bot;
