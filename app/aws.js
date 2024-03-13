// src/utils/s3Uploads.js
import AWS from 'aws-sdk';

// Configure AWS S3
AWS.config.update({
  accessKeyId: 'AKIAQ4K3CQ5H2OW7LPUD',
  secretAccessKey: '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',
  region: 'eu-north-1',
});

const s3 = new AWS.S3();

const uploadFileToS3 = async (file) => {
    const timestampedFileName = `${Date.now()}_${file.name}`; // Name to be saved in S3
    const s3Key = `uploads/${timestampedFileName}`; 
  const uploadParams = {
    Bucket: 'bpu-images-v1',
    Key: s3Key,
    Body: file,
  };

  try {
    const data = await s3.upload(uploadParams).promise();
    return { url: data.Location, name: timestampedFileName };
  } catch (err) {
    console.error("Upload failed:", err.message);
  console.log("Error code:", err.code);
  console.log("Request ID:", err.requestId);
  console.log("Full error:", err);
    return null;
  }
};

export { uploadFileToS3 };
