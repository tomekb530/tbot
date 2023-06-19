import { Events, Message } from "discord.js";
import { TBot } from "../types/TBot";

export const event = {
    name: Events.MessageCreate,
    once: false,
    execute(tbot: TBot, msg: Message) {
        
    },
};