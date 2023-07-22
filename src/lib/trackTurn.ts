import { Message } from "discord.js";
import fs from "node:fs";

type trackType = {
  [key: string]: number;
};

type storyType = {
  [key: number]: string;
};

export function trackTurn(
  message: string,
  msg: Message,
  trackFilePath: string,
  storyFilePath: string
) {
  try {
    const author: string = msg.author.id;

    let track: trackType = {};
    let story: storyType = {};

    const trackData = fs.readFileSync(trackFilePath, "utf8");
    if (trackData) {
      track = JSON.parse(trackData);
    }

    const storyData = fs.readFileSync(storyFilePath, "utf-8");
    if (storyData) {
      story = JSON.parse(storyData);
    }

    if (author in track) {
      track[author] += 1;
    } else {
      track[author] = 1;
    }
    console.log(track);

    fs.writeFileSync(trackFilePath, JSON.stringify(track));

    if (track[author] === 1) {
      const storyLength = Object.keys(story).length;
      story[storyLength] = message;
      fs.writeFileSync(storyFilePath, JSON.stringify(story));
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
