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

  const storyFilePath = path.join(__dirname, "..", "..", "/data/story.txt");
  const trackFilePath = path.join(__dirname, "..", "..", "/data/track.json");

  const message: string = msg.content.toString();
  const author: string = msg.author.id;
  const story: string = fs.readFileSync(storyFilePath, {
    encoding: "utf8",
    flag: "r",
  });
  const dash: RegExp = new RegExp("_", "g");
  const count: number = (story.match(dash) || []).length;
  const msgCount: number = (message.match(dash) || []).length;
  const space: boolean = message.includes(" ");
  const storyPostChannel: Channel | undefined =
    client.channels.cache.get(storyPostChannelId);

  try {
    if (msg.channelId === storyChannelId) {
      let isPosted: boolean = false;

      if (storyPostChannel && storyPostChannel instanceof TextChannel) {
        isPosted = verifyAndPostStory(
          msg,
          message,
          count,
          story,
          storyPostChannel,
          storyFilePath,
          trackFilePath
        );
      }
      if (isPosted) return;

      const check: boolean = checkConditions(msg, message, space, msgCount);
      if (!check) return;

      trackTurn(author, message, msg, storyFilePath, trackFilePath);
    }
  } catch (err) {
    console.log(`Message error ${err}`);
  }
}
