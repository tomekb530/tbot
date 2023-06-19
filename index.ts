import { Client, Collection, GatewayIntentBits, REST} from "discord.js";
import { TBot } from "./src/types/TBot";
import Config  from "./config";
import { join } from "path";
import { loadCommands, loadEvents } from "./src/utils/loader";
const rest = new REST().setToken(Config.key);
const tbot:TBot = {
    client: new Client({intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]}),
    commands: new Collection(),
    events: new Collection(),
};
loadCommands(tbot, rest, Config);
loadEvents(tbot, rest, Config);
tbot.client.login(Config.key);
