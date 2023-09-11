const { Client, GatewayIntentBits } = require('discord.js');
const { DISCORD_TOKEN, ANNOUNCEMENT_URI, ANNOUNCEMENT_URI_DEV } = require('../../.storage/discord.json');
const { REST } = require('@discordjs/rest');
const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);
const { Routes } = require('discord-api-types/v9');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
];

global.client = new Client({ intents });
global.discord = {
	send: async (channelId, content = {}) => {
		console.log(content);
		const channel = await client.channels.fetch(channelId);
		return await channel.send(content);
	},
	webhookSend: async (payload) => {
		console.log(payload);
		const response = await fetch(`${ANNOUNCEMENT_URI_DEV}?wait=true`, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});
		if (response.ok) {
			const data = await response.json();
			return data.id;
		}
		console.log('error');
	},
	webhookEdit: async (messageId, payload) => {
		console.log(payload);
		const response = await fetch(`${ANNOUNCEMENT_URI_DEV}/messages/${messageId}?wait=true`, {
			method: 'PATCH',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});
		if (response.ok) {
			const data = await response.json();
			return data;
		}
		console.log(response);
	}
}

client.login(DISCORD_TOKEN);

client.on('ready', () => {
    console.log('Authenticated');   
});