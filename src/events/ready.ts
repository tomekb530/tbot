import { Client, Events } from "discord.js";
import { TBot } from "../types/TBot";

export const event = {
    name: Events.ClientReady,
    once: false,
    execute(tbot: TBot, client: Client) {
        console.log("Ready, logged in as " + client.user?.tag + "!")
    },
};