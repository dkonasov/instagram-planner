import { MD5 } from "crypto-js";

export const makeFileName = (originalFileName: string) => {
  const [extension] = originalFileName.split(".").reverse();

  const timestamp = new Date().getTime().toString();
  const newFileName = MD5(timestamp + originalFileName).toString();

  return `${newFileName}.${extension}`;
};
