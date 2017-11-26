'use strict';

const lib = require('./lib/lib.js');

module.exports.sign = (event, context, callback) => {
	/** Immediate response for WarmUP plugin */
	if (event.source === 'serverless-plugin-warmup') {
		console.log('WarmUP - Lambda is warm!');
		return callback(null, 'Lambda is warm!');
	}

	// Will sign the policy document or REST headers.
	console.log('Received event:', JSON.stringify(event, null, 2));
	var requestPayload = event.body
	if (requestPayload.get('headers')){
		var response_data = lib.signHeaders();
	} else {
		// TODO: get credential
		response_data = lib.signPolicy(request.data, credential);	
	}
	callback(null, response_data);
};