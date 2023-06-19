import { Client, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { TBot } from '../types/TBot';

export function loadCommands(tbot: TBot, rest: REST, Config: any) {
    const commands :any[] = [];
    console.log('Loading commands...');
    const commandFiles = readdirSync('./src/commands/').filter(file => file.endsWith('.ts'));
    for (const file of commandFiles) {
        console.log(`Loading command ${file}`);
        const cmd = require(`../commands/${file}`).command;
        commands.push(cmd.data.toJSON());
        tbot.commands.set(cmd.data.name, cmd);
    }
    rest.put(Routes.applicationCommands(Config.clientId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
}

export function loadEvents(tbot: TBot, rest: REST, Config: any) {
    console.log('Loading events...');
    const eventFiles = readdirSync('./src/events/').filter(file => file.endsWith('.ts'));
    for (const file of eventFiles) {
        console.log(`Loading event ${file}`);
        const ev = require(`../events/${file}`).event;
        if (ev.once) {
            tbot.client.once(ev.name, (...args) => ev.execute(tbot,...args));
        }
        else {
            tbot.client.on(ev.name, (...args) => ev.execute(tbot,...args));
        }

        tbot.events.set(ev.name, ev);
    }
}