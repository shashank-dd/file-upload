import AWS from 'aws-sdk';

const BUCKET_NAME = 'user-test-bucket-fu';
const REGION = 'ap-south-1';
const ACCESS_KEY = 'AKIA6LO5UIQRE2SUCVGZ';
const SECRET_KEY = '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';

const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION,
});

export const uploadFileToS3 = async (file, onUploadProgress) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: `${Date.now()}_${file.name}`,
    Body: file,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, { onUploadProgress })
      .on('httpUploadProgress', (progress) => {
        const percentage = Math.round(
          (progress.loaded / progress.total) * 100
        );
        onUploadProgress(percentage);
      })
      .send((error, data) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(data);
        }
      });
  });
};
