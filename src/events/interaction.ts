import { Events, Interaction} from "discord.js";
import { TBot } from "../types/TBot";

export const event = {
    name: Events.InteractionCreate,
    once: false,
    execute(tbot: TBot, interaction: Interaction) {
        if (!interaction.isCommand()) return;
        const cmdName = interaction.commandName;
        if(!tbot.commands.has(cmdName)) return;
        const cmd = tbot.commands.get(cmdName);
        try {
            cmd.execute(interaction);
        }
        catch (error) {
            console.error(error);
            interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
};