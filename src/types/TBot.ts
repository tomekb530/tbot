import { Client, Collection } from "discord.js";

export interface TBot {
    client: Client;
    commands: Collection<string, any>;
    events: Collection<string, any>;
}