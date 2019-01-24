# lambda-nodejs-s3-signature

[![Known Vulnerabilities](https://snyk.io/test/github/lantrix/lambda-nodejs-s3-signature/badge.svg?targetFile=package.json)](https://snyk.io/test/github/lantrix/lambda-nodejs-s3-signature?targetFile=package.json)
[![Known Vulnerabilities](https://travis-ci.org/lantrix/lambda-nodejs-s3-signature.svg?branch=master
)](https://travis-ci.org/lantrix/lambda-nodejs-s3-signature/builds)

Sign AJAX/CORS requests with AWS Lambda for direct browser to S3 uploads

## Configure Function for deployment

Configure the Service deployment, and the function in the `config.yml` file.

 * Populate the serverless deployment options
    - `AccessControlAllowOrigin`: Value for Access-Control-Allow-Origin header for the Server Response
