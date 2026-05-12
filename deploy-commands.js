require('dotenv').config();

const { REST, Routes } = require('discord.js');

const commands = [
{
name: 'startserver',
description: 'Start the Aternos server'
},
{
name: 'stopserver',
description: 'Stop the Aternos server'
}
];

const rest = new REST({ version: '10' });

rest.setToken(process.env.TOKEN);

console.log('Registering slash commands...');

rest.put(
Routes.applicationCommands(process.env.CLIENT_ID),
{ body: commands }
)
.then(() => {
console.log('Slash commands registered.');
})
.catch(console.error);
