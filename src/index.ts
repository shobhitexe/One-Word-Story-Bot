import { Client, GatewayIntentBits } from "discord.js";
import { readyEvent } from "./events/readyEvent";
import { messageEvent } from "./events/messageEvent";
import { config } from "./config/env";

const { discordToken } = config();

const client: Client<boolean> = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => readyEvent(client));
client.on("messageCreate", (msg) => messageEvent(client, msg));

client.login(discordToken);
