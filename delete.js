const AWS = require('aws-sdk');

var s3 = new AWS.S3();

const objectName = 'resources.txt';

var params = {
    Bucket: 'example-bucket-ais', /* required */
    Key:objectName
  };
s3.deleteObject(params, function (err, data) {
        if (err) console.log(err, err.stack);  // error
        else console.log(`Deleted ${objectName}`);                 // deleted
      });