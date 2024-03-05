const {
  GetObjectCommand,
  S3Client,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const axios = require("axios");

const s3Client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: "AKIAVRUVRT2OPWG6MOLE",
    secretAccessKey: "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",
  },
});

exports.getObjectURL = async (key) => {
  const command = new GetObjectCommand({
    Bucket: "sysintelli-receipts-bucket",
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command);
  return url;
};

exports.putObjectURL = async (key, contentType) => {
  const command = new PutObjectCommand({
    Bucket: "sysintelli-receipts-bucket",
    Key: key,
    contentType: contentType,
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
  return url;
};

exports.uploadObjectToS3 = async (url, pdfData, contentType) => {
  try {
    const response = await axios.put(url, pdfData, {
      headers: {
        "Content-Type": contentType,
      },
    });
    return response;
  } catch (error) {
    console.error("Error uploading PDF to S3:", error);
  }
};
