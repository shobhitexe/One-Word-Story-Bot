import { Message, TextChannel, EmbedBuilder } from "discord.js";
import fs from "node:fs";

export function verifyAndPostStory(
  msg: Message,
  message: string,
  story: string,
  storyPostChannel: TextChannel,
  storyFilePath: string,
  trackFilePath: string
) {
  console.log(message);

  if (message === ".") {
    let storyString: string = "";

    const storyJson = JSON.parse(story);
    const storyArr = Object.keys(storyJson);
    storyArr.map((key) => {
      console.log(storyJson[key]);
      storyString = storyString + " " + storyJson[key];
    });

    if (storyArr.length >= 15) {
      const storyEmbed = new EmbedBuilder()
        .setTitle("New Story is here")
        .setDescription(storyString);

      storyPostChannel.send({ embeds: [storyEmbed] });

      fs.writeFileSync(storyFilePath, JSON.stringify({}));
      fs.writeFileSync(trackFilePath, JSON.stringify({}));
      msg.channel.send(`Posted Story in <#${storyPostChannel.id}>`);
      console.log("Story posted");

      return true;
    } else {
      msg.delete();
      msg.channel
        .send(`Can't end story here ${15 - storyArr.length} more words needed`)
        .then((message) => setTimeout(() => message.delete(), 2000));
      return true;
    }
  }
  return false;
}
