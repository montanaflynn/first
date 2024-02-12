// ⚠️ Only modify this file if you know what you're doing!
const { Bot } = require("./bot");

function send(channel, payload) {
  process.stderr.write(
    `\n<<zilch>>.${channel}${payload ? "." + payload : ""}\n`
  );
}

function parsePayload(payload) {
  const [paddleX, paddleY, ballX, ballY] = payload
    .split(",")
    .map((value) => parseFloat(value));

  return [
    { x: paddleX, y: paddleY },
    { x: ballX, y: ballY },
  ];
}

let bot;

process.stdin.on("data", async (chunk) => {
  const data = chunk.toString().trim();
  const channel = data.split(".", 1)[0];
  const payload = data.slice(channel.length + 1);

  if (channel === "start") {
    const standardCustomConfigSplit = payload.indexOf(".");
    const standardConfigParts = payload
      .slice(0, standardCustomConfigSplit)
      .split(",");

    const config = {
      gameTimeLimit: parseInt(standardConfigParts[0]),
      turnTimeLimit: parseInt(standardConfigParts[1]),
      paddle: standardConfigParts[2] === "0" ? "west" : "east",
    };

    bot = new Bot(config);

    send("start");
    return;
  }

  if (!bot) {
    throw new Error("Bot not yet initialized.");
  }

  if (channel === "move") {
    const move = await bot.move(...parsePayload(payload));
    send("move", move);
    return;
  }

  if (channel === "end") {
    await bot.end(...parsePayload(payload));
    return;
  }
});

send("ready");
