import { createResource } from "solid-js";
import { getS3Client } from "../functions/get-s3-client";
import { GetObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import { Image } from "../entities/image";

export const indexDataFunction = () => {
  return createResource(async () => {
    const result = { data: null };
    const s3Client = getS3Client();

    if (!s3Client) {
      return result;
    }

    const { Contents } = await s3Client.send(
      new ListObjectsCommand({ Bucket: import.meta.env.VITE_BUCKET })
    );

    if (!Contents?.length) {
      return { data: [] };
    }

    Contents.sort((a, b) => {
      if (a.LastModified!.getTime() < b.LastModified!.getTime()) {
        return 1;
      } else if (a.LastModified!.getTime() > b.LastModified!.getTime()) {
        return -1;
      } else {
        return 0;
      }
    });

    const promises: Promise<Image>[] = Contents.map((metadata) => {
      return s3Client
        .send(
          new GetObjectCommand({
            Bucket: import.meta.env.VITE_BUCKET,
            Key: metadata.Key,
          })
        )
        .then(async (s3ImageData) => {
          return {
            name: metadata.Key!,
            objectUrl: URL.createObjectURL(
              new Blob([await s3ImageData.Body!.transformToByteArray()], {
                type: s3ImageData.ContentType,
              })
            ),
          };
        });
    });

    const images = await Promise.all(promises);

    return { data: images };
  })[0];
};
