import { Client, ActivityType } from "discord.js";

export function readyEvent(client: Client) {
  console.log(`Ready! Logged in as ${client.user?.tag}`);
  client.user?.setPresence({ status: "online" });
  client.user?.setActivity("Your Words", {
    type: ActivityType.Watching,
  });
}
