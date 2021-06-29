const AWS = require('aws-sdk');

var s3 = new AWS.S3();
var params = {
    Bucket: 'example-bucket-ais' /* required */
  };
    s3.listObjectsV2(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {data.Contents.map(x=>console.log(`File: ${x.Key}\t\tURL: https://example-bucket-ais.s3.us-east-2.amazonaws.com/${x.Key}`))}           // successful response
  });
