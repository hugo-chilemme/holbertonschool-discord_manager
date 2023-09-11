const slack = require('./libs/slack.lib');

async function get_messages() {

	const slackData = require('data-store')({ path: process.cwd() + '/.storage/slack.json' });
	const messages = slackData.get('messages') || {};
	
	data = await slack.get('conversations.history', { 
		channel: 'C043TN0J3RD',
		include_all_metadata: true,
		inclusive: true,
		limit: 100,
	});

	data.messages.reverse();


	for (const message of data.messages)
	{

		let content = "";
		try {
			content = decodeURIComponent(message.text);
		} catch(e) { }
		if (!message.client_msg_id || message.type !== 'message') continue;
		const id = message.client_msg_id;
		if (messages[id])
		{

			if (!message.edited) continue;
			if (messages[id].edited && messages[id].edited.ts === message.edited.ts) continue;
			discord.webhookEdit(messages[id].discord_id, {content: content.substring(0, 2000)});
			messages[id] = {...messages[id], ...message};
			slackData.set('messages', messages);
			continue;
		} 
		const user = await slack.get('users.profile.get', {user: message.user});


		const discord_id = await discord.webhookSend({
			username: user.profile.display_name,
			avatar_url: user.profile.image_original,
			content: content.substring(0, 2000),
		})

		messages[id] = {
			discord_id,
			...message,
		}

		slackData.set('messages', messages);

	}
}

// setInterval(get_messages, 5000)
get_messages();