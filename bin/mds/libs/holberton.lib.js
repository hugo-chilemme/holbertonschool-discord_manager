const axios = require('axios');

async function get(event, params = {}) {

	if (!event)	return;

	const API_URI = `http://localhost:2016/api/${event}`;
    const REQ_START = new Date().getTime();
	const headers = {
		'secret-client': 'fdWnfpmcCNPiRbq5dinppyByAcykandUGSn9DtJWFCykJE4v5WNQ9WNF8jrvsh3c',
        'accept': 'application/json'
    };

	console.log(`\x1b[90mEvent: ${API_URI} (Status: Progress) - Arguments: ${JSON.stringify(params)}\x1b[0m`);

	try {
		const response = await axios.get(API_URI, { params, headers });
	  
		const REQ_STOP = new Date().getTime();
		console.log(`\x1b[90mEvent: ${API_URI} (Status: ${response.status}, Time: ${((REQ_STOP - REQ_START) / 1000).toFixed(2)}s)\x1b[0m`);
		
		return response.data;
	  } catch (e) {
		const REQ_STOP = new Date().getTime();
		console.log(`\x1b[31mEvent: ${API_URI} (Status: Failed, Time: ${((REQ_STOP - REQ_START) / 1000).toFixed(2)}s)\x1b[0m`);
		console.error(e);
		return null;
	  }
	  

}

module.exports = { get };