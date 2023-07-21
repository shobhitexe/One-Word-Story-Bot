import dotenv from "dotenv";
dotenv.config();

interface Config {
  discordToken: string;
  serverId: string;
  storyChannelId: string;
  storyPostChannelId: string;
}

export function config(): Config {
  const discordToken: string = process.env.DISCORD_TOKEN || "";
  const serverId: string = process.env.SERVER_ID || "";
  const storyChannelId: string = process.env.STORY_CHANNEL_ID || "";
  const storyPostChannelId: string = process.env.STORY_POST_CHANNEL_ID || "";

  return {
    discordToken,
    serverId,
    storyChannelId,
    storyPostChannelId,
  };
}
