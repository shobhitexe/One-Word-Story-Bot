import { Message, TextChannel, EmbedBuilder } from "discord.js";
import fs from "node:fs";

export function verifyAndPostStory(
  msg: Message,
  message: string,
  count: number,
  story: string,
  storyPostChannel: TextChannel,
  storyFilePath: string,
  trackFilePath: string
) {
  console.log(message);

  if (message === ".") {
    if (count > 15) {
      const storyEmbed = new EmbedBuilder()
        .setTitle("New Story is here")
        .setDescription(story);

      storyPostChannel.send({ embeds: [storyEmbed] });

      fs.truncateSync(storyFilePath, 0);
      msg.channel.send(`Posted Story in <#${storyPostChannel.id}>`);

      fs.writeFileSync(trackFilePath, JSON.stringify({}));
      return true;
    } else {
      msg.delete();
      msg.channel
        .send(`Can't end story here ${15 - count} more words needed`)
        .then((msg) => setTimeout(() => msg.delete(), 2000));
      return false;
    }
  }
  return false;
}
