const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const fs = require('fs');

const lib = require('../lib/lib.js');

// Pre load environment variables with testing settings from .env
require('dotenv').config({ path: '.env' });

const s3PostPolicy = './test/data/policy.json';

var testHeaders = `AWS4-HMAC-SHA256
20130524T000000Z
20130524/us-east-1/s3/aws4_request
cee3fed04b70f867d036f722359b0b1f2f0e5dc0efadbc082b76c4c60e316455`;

describe('AWS API Request Functions', function() {

	describe('signPolicy', function() {
		it('Creates a signed policy document for an S3 POST form', function() {
			let policy = JSON.parse(eval(fs.readFileSync(s3PostPolicy)));
			var data = lib.signPolicy(policy, 'AKIAIOSFODNN7EXAMPLE/20151229/us-east-1/s3/aws4_request');
			assert(data != null, 'Function should return data');
			expect(data).to.be.a('object');
			expect(data).to.have.property('policy').to.have.length.above(0);
			expect(data).to.have.property('signature').to.have.length.above(0);
		});
	});

	describe('signHeaders', function() {
		it('Creates a signature Header for a chunked upload', function() {
			var data = lib.signHeaders(testHeaders);
			assert(data != null, 'Function should return data');
			expect(data).to.be.a('object');
			expect(data).to.have.property('signature').to.have.length.above(0);
		});
	});
});