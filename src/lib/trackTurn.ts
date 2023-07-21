import { Message } from "discord.js";
import fs from "node:fs";

type trackType = {
  [key: string]: number;
};

export function trackTurn(
  author: string,
  message: string,
  msg: Message,
  storyFilePath: string,
  trackFilePath: string
) {
  try {
    let track: trackType = {};

    const trackData = fs.readFileSync(trackFilePath, "utf8");
    if (trackData) {
      track = JSON.parse(trackData);
    }

    if (author in track) {
      track[author] += 1;
    } else {
      track[author] = 1;
    }
    console.log(track);

    fs.writeFileSync(trackFilePath, JSON.stringify(track));

    if (track[author] === 1) {
      fs.appendFileSync(storyFilePath, `${message}_`);
      msg.react("✅");
    } else {
      msg.delete();
      msg.channel
        .send("Wait For your turn")
        .then((warnMsg) => setTimeout(() => warnMsg.delete(), 2000));
    }

    if (Object.keys(track).length > 1) {
      for (const data in track) {
        delete track[data];
      }

      fs.writeFileSync(trackFilePath, JSON.stringify(track), "utf-8");

      track[author] = 2;

      fs.writeFileSync(trackFilePath, JSON.stringify(track), "utf-8");
    }
  } catch (error) {
    console.log(error);
  }
}
