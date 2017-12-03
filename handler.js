'use strict';

const lib = require('lib/lib.js');

module.exports.sign = (event, context, callback) => {
	/** Immediate response for WarmUP plugin */
	if (event.source === 'serverless-plugin-warmup') {
		console.log('WarmUP - Lambda is warm!');
		return callback(null, 'Lambda is warm!');
	}

	// Will sign the policy document or REST headers.
	console.log('Received event:', JSON.stringify(event, null, 2));
	var requestPayload = event.body;
	var response_data = {};
	console.log(requestPayload);
	if (requestPayload){
		// var response_data = lib.signHeaders();
		response_data = { 'response': true };
	} else {
		// TODO: get credential
		// response_data = lib.signPolicy(request.data, credential);
		response_data = {'response': true};
	}
	callback(null, {
		'statusCode': 200,
		'headers': {
			'Access-Control-Allow-Origin': 'test.noagenda.info',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Cache-Control, X-Requested-With, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token'
		},
		'body': response_data
	});
};