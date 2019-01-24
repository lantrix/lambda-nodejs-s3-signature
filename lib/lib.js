const crypto = require('crypto-js');
const Base64 = require('crypto-js/enc-base64');

const secret = process.env.AWS_SECRET_ACCESS_KEY;

module.exports = {
	signPolicy: signPolicy,
	signHeaders: signHeaders
};

function getSignatureKey(key, dateStamp, regionName, serviceName) {
	// console.log('Key: ' + key);
	// console.log('dateStamp: ' + dateStamp);
	// console.log('regionName: ' + regionName);
	// console.log('serviceName: ' + serviceName);
	// http://docs.aws.amazon.com/general/latest/gr/signature-v4-examples.html#signature-v4-examples-javascript
	let kDate = crypto.HmacSHA256(dateStamp, 'AWS4' + key);
	let kRegion = crypto.HmacSHA256(regionName, kDate);
	let kService = crypto.HmacSHA256(serviceName, kRegion);
	let kSigning = crypto.HmacSHA256('aws4_request', kService);
	return kSigning;
}

function signPolicy(policy, credential) {
	// Sign and return the policy document for a simple upload.
	// http://aws.amazon.com/articles/1434/#signyours3postform
	// http://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-authentication-HTTPPOST.html
	let wordArray = crypto.enc.Utf8.parse(JSON.stringify(policy));
	let base64Policy = crypto.enc.Base64.stringify(wordArray);
	let parts = credential.split('/');
	let dateStamp = parts[1];
	let region = parts[2];
	let serviceName = parts[3];

	let signedKey = getSignatureKey(secret, dateStamp, region, serviceName);
	let signature = crypto.HmacSHA256(base64Policy, signedKey).toString(crypto.enc.Hex);
	return { 'policy': base64Policy, 'signature': signature };
}

function signHeaders(headers) {
	// Sign and return the headers for a chunked upload.
	let parts = headers.split('\n');
	let canonical_request = parts.slice(3).join('\n');
	let algorithm = parts[0];
	let amz_date = parts[1];
	let credential_scope = parts[2];
	let stringToSign = algorithm + '\n' + amz_date + '\n' + credential_scope + '\n' + crypto.SHA256(canonical_request).toString(crypto.enc.Hex);

	let cred_parts = credential_scope.split('/');
	let dateStamp = cred_parts[0];
	let region = cred_parts[1];
	let serviceName = cred_parts[2];
	let signed_key = getSignatureKey(secret, dateStamp, region, serviceName);
	let signature = crypto.HmacSHA256(signed_key, stringToSign).toString(crypto.enc.Hex);
	return { 'signature': signature };
}

