import AWS from "aws-sdk";
import { StringDecoder } from "string_decoder";
import { toArray } from "lib/converter";

const decoder = new StringDecoder("utf8");

AWS.config.accessKeyId = process.env.MY_AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY;
AWS.config.region = "ap-northeast-1";
AWS.config.apiVersions = {
  s3: "2006-03-01",
};

var s3 = new AWS.S3();

// you should use PosixPath to specify an argument in fetching functions from S3
// an argument must end with "/"
// specify an argument as [""] to check root directory in S3

export async function fetchFileContents(posixPath: string) {
  var params = {
    Bucket: "chilvary-s3",
    Key: posixPath,
  };
  try {
    const result = await s3.getObject(params, (err, data) => {}).promise();
    return decoder.write(Buffer.from(result.Body));
  } catch (err) {
    console.log(err);
  }
}

export async function fetchDirectoryContents(posixPath: string) {
  var params = {
    Bucket: "chilvary-s3",
    Prefix: posixPath,
    Delimiter: "/",
    MaxKeys: 10000,
  };
  try {
    const result = await s3.listObjects(params, (err, data) => {}).promise();

    const directories = result.CommonPrefixes.map((item) => {
      return toArray(item.Prefix);
    });

    const files = result.Contents.map((item) => {
      return toArray(item.Key);
    });
    return {
      directories: directories,
      files: files,
    };
  } catch (err) {
    console.log(err);
  }
}
