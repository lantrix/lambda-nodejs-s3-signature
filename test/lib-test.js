const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const lib = require('../lib/lib.js');

describe('AWS API Request Functions', function() {

	describe('sign', function() {
		it('Signs a given message with a key', function() {
			var data = lib.sign();
			assert(data != null, 'Function should return data');
		});
	});

	describe('getSignatureKey', function() {
		it('Derives a Signing Key for Signature Version 4', function() {
			var data = lib.getSignatureKey();
			assert(data != null, 'Function should return data');
		});
	});

	describe('signPolicy', function() {
		it('Creates a signed policy document for an S3 POST form', function() {
			var data = lib.signPolicy();
			assert(data != null, 'Function should return data');
		});
	});

	describe('signHeaders', function() {
		it('Creates a signature Header for a chunked upload', function() {
			var data = lib.signHeaders();
			assert(data != null, 'Function should return data');
		});
	});
});