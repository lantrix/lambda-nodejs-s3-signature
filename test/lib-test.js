const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const fs = require('fs');

const lib = require('../lib/lib.js');

// Pre load environment variables with testing settings from .env
require('dotenv').config({ path: '.env' });

const s3PostPolicy = './test/data/policy.json';

describe('AWS API Request Functions', function() {

	describe('signPolicy', function() {
		it('Creates a signed policy document for an S3 POST form', function() {
			let policy = JSON.parse(eval(fs.readFileSync(s3PostPolicy)));
			var data = lib.signPolicy(policy, 'AKIAIOSFODNN7EXAMPLE/20151229/us-east-1/s3/aws4_request');
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