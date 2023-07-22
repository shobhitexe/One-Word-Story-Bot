import { Message, Client, Channel, TextChannel } from "discord.js";
import fs from "node:fs";
import { config } from "../config/env";
import { checkConditions } from "../lib/checkConditions";
import { verifyAndPostStory } from "../lib/verifyAndPostStory";
import { trackTurn } from "../lib/trackTurn";
import path from "node:path";

const { storyChannelId, storyPostChannelId } = config();

export async function messageEvent(client: Client, msg: Message) {
  if (msg.author.bot) return;

  const storyFilePath = path.join(__dirname, "..", "..", "/data/story.json");
  const trackFilePath = path.join(__dirname, "..", "..", "/data/track.json");

  const message: string = msg.content.toString();
  const story: string = fs.readFileSync(storyFilePath, {
    encoding: "utf8",
    flag: "r",
  });

  const storyPostChannel: Channel | undefined =
    client.channels.cache.get(storyPostChannelId);

  try {
    if (msg.channelId === storyChannelId) {
      let isPosted: boolean = false;

      if (storyPostChannel && storyPostChannel instanceof TextChannel) {
        isPosted = verifyAndPostStory(
          msg,
          message,
          story,
          storyPostChannel,
          storyFilePath,
          trackFilePath
        );
      }
      if (isPosted) return;

      const check: boolean = checkConditions(msg, message);
      if (!check) return;

      trackTurn(message, msg, trackFilePath, storyFilePath);
    }
  } catch (err) {
    console.log(`Message error ${err}`);
  }
}
