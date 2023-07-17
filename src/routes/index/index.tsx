import { useNavigate, useRouteData } from "@solidjs/router";
import { Component, For, Show, createEffect, createSignal } from "solid-js";
import {
  DeleteObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getS3Client } from "../../functions/get-s3-client";
import { indexDataFunction } from "../../resolvers";
import { Image } from "../../entities/image";
import { makeFileName } from "../../functions/make-file-name";

export const IndexPage: Component = () => {
  const navigate = useNavigate();
  const data = useRouteData<typeof indexDataFunction>();
  const [getImages, setImages] = createSignal<Image[] | null>(null);

  const s3Client = getS3Client();

  const onChange = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files![0];
    const fileName = makeFileName(file.name);

    await s3Client!.send(
      new PutObjectCommand({
        Bucket: import.meta.env.VITE_BUCKET,
        Key: fileName,
        Body: file,
        ContentType: file.type,
      })
    );

    const newImages = [...getImages()!];
    newImages.unshift({
      name: fileName,
      objectUrl: URL.createObjectURL(file),
    });
    setImages(newImages);
  };

  const onDelete = async (index: number) => {
    const images = getImages();

    if (!images) {
      return;
    }

    await s3Client!.send(
      new DeleteObjectCommand({
        Bucket: import.meta.env.VITE_BUCKET,
        Key: images[index].name,
      })
    );

    const newImages = [...images];
    newImages.splice(index, 1);

    setImages(newImages);
    URL.revokeObjectURL(images[index].objectUrl);
  };

  createEffect(() => {
    if (data()?.data === null) {
      navigate("/login");
    }
  });

  createEffect(() => {
    const imagesFromData = data()?.data;
    if (imagesFromData) {
      setImages(imagesFromData);
    }
  });

  return (
    <Show when={getImages()} fallback="Loading...">
      <Show when={getImages()?.length === 0}>
        <div>No images</div>
      </Show>
      <div>
        <For each={getImages()!}>
          {(image, index) => (
            <>
              <div>
                <img src={image.objectUrl} />
              </div>
              <button type="button" onClick={() => onDelete(index())}>
                Delete
              </button>
            </>
          )}
        </For>
      </div>
      <input type="file" onChange={onChange} />
    </Show>
  );
};
