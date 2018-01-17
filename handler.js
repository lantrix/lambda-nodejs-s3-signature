'use strict';

const lib = require('./lib/lib.js');
const AllowOriginHeader = process.env.AccessControlAllowOrigin;

module.exports.sign = (event, context, callback) => {
	/** Immediate response for WarmUP plugin */
	if (event.source === 'serverless-plugin-warmup') {
		console.log('WarmUP - Lambda is warm!');
		return callback(null, 'Lambda is warm!');
	}

	// Will sign the policy document or REST headers.
	//console.log('Received event:', JSON.stringify(event, null, 2));
	var requestPayload = event.body;
	var response_data = {};
	console.log(requestPayload);
	if (requestPayload){
		JSON.parse(requestPayload).conditions.forEach(condition => {
			if ('x-amz-credential' in condition){
				console.log(condition['x-amz-credential']);
				response_data = lib.signPolicy(requestPayload, condition['x-amz-credential']);
			}
		});
	} else {
		// TODO: get credential
		// var response_data = lib.signHeaders();
		response_data = { response: true };
	}
	callback(null, {
		'statusCode': 200,
		'headers': {
			'Access-Control-Allow-Origin': AllowOriginHeader,
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin, Content-Type, Cache-Control, X-Requested-With, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token'
		},
		'body': JSON.stringify(response_data)
	});
};