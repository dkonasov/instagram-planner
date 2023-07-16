import { S3Client } from "@aws-sdk/client-s3";

let cachedClient: S3Client | null = null;

export const getS3Client = () => {
  if (cachedClient) {
    return cachedClient;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const [accessKeyId, secretAccessKey] = token.split(":");
  const s3Client = new S3Client({
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    region: import.meta.env.VITE_S3_REGION,
    endpoint: import.meta.env.VITE_S3_ENDPOINT,
  });

  cachedClient = s3Client;

  return s3Client;
};
