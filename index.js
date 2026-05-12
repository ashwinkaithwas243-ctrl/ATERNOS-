require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const puppeteer = require('puppeteer-core');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {
    console.log(`${client.user.tag} is online.`);
});

client.on('interactionCreate', async interaction => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'startserver') {

        await interaction.reply({
            content: '🚀 Starting Aternos server...',
            ephemeral: true
        });

        try {

            const browser = await puppeteer.launch({
                headless: false,
                userDataDir: './chrome-data',
                defaultViewport: null,
                args: ['--start-maximized']
            });

            const page = await browser.newPage();

            // OPEN SERVERS PAGE
            await page.goto('https://aternos.org/servers/', {
                waitUntil: 'networkidle2'
            });

            console.log('Servers page opened');

            // WAIT FOR SERVER CARD
            await page.waitForSelector('.servercard', {
                timeout: 60000
            });

            // CLICK SERVER
            await page.click('.servercard');

            console.log('Server selected');

            // WAIT FOR START BUTTON
            await page.waitForSelector('#start', {
                timeout: 60000
            });

            // CLICK START BUTTON
            await page.click('#start');

            console.log('Start button clicked');

            await interaction.followUp({
                content: '✅ Server started successfully!',
                ephemeral: true
            });

        } catch (err) {

            console.error(err);

            await interaction.followUp({
                content: '❌ Failed to start server.',
                ephemeral: true
            });

        }

    }

});

client.login(process.env.TOKEN);