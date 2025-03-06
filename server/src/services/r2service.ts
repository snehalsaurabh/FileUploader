import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!
  },
  forcePathStyle: true
});

const uploadFileToR2 = async (fileName: string, fileBuffer: Buffer, mimeType: string): Promise<void> => {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimeType
  });
  await s3Client.send(command);
};

const downloadFileFromR2 = async (fileName: string): Promise<Readable> => {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileName
  });
  const { Body } = await s3Client.send(command);
  return Body as Readable;
};

export { uploadFileToR2, downloadFileFromR2 };
