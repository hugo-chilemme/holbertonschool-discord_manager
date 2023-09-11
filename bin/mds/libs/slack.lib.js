const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


function generate_url(url, params) {
    return url + "?" + new URLSearchParams(params).toString();
}

async function get(eventName, params = {}) {

	const slackData = require('data-store')({ path: '/applications/holbertonschool-discord_manager/bin/core/slack.json' });


	const API_URI = `https://slack.com/api/${eventName}`;
	const url = generate_url(API_URI, params);

	console.log(`\x1b[90mEvent: ${API_URI} (Status: Progress) - Arguments: ${JSON.stringify(params)}\x1b[0m`);

	const { access_token } = slackData.get();
	const REQ_START = new Date().getTime();
	const options = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${access_token}`,
		}
	}
	
	const response = await fetch(url, options);
	const data = await response.json();
	const REQ_STOP = new Date().getTime();

	if (!data.ok)
	{
		console.error(data);
		console.log(`\x1b[31mEvent: ${API_URI} (Status: Failed, Time: ${((REQ_STOP - REQ_START) / 1000).toFixed(2)}s)\x1b[0m`);
		return null;
	}

	console.log(`\x1b[90mEvent: ${API_URI} (Status: ${response.status}, Time: ${((REQ_STOP - REQ_START) / 1000).toFixed(2)}s)\x1b[0m`);

	return data;
}

module.exports = { get };