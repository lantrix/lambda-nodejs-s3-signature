const crypto = require('crypto-js');

module.exports = {
	sign: sign,
	getSignatureKey: getSignatureKey,
	signPolicy: signPolicy,
	signHeaders: signHeaders
};

// Key derivation functions. See:
// http://docs.aws.amazon.com/general/latest/gr/signature-v4-examples.html#signature-v4-examples-javascript

function sign(key, msg) {
}

function getSignatureKey(Crypto, key, dateStamp, regionName, serviceName) {
	// http://docs.aws.amazon.com/general/latest/gr/signature-v4-examples.html#signature-v4-examples-javascript
	var kDate = crypto.HmacSHA256(dateStamp, 'AWS4' + key);
	var kRegion = crypto.HmacSHA256(regionName, kDate);
	var kService = crypto.HmacSHA256(serviceName, kRegion);
	var kSigning = crypto.HmacSHA256('aws4_request', kService);
	return kSigning;
}

function signPolicy(policy, credential) {
	// Sign and return the policy document for a simple upload.
	// http://aws.amazon.com/articles/1434/#signyours3postform
}

function signHeaders(headers) {
	// Sign and return the headers for a chunked upload.
}

