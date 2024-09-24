import { message, UploadFile } from 'antd';

export const isValidImageSize = (file: UploadFile, maxSizeInMB: number) => {
  const fileSizeInMB = file.size ? file.size / 1024 / 1024 : 0;
  const isSmallEnough = fileSizeInMB < maxSizeInMB;

  if (!isSmallEnough) {
    message.error(`Image must be smaller than ${maxSizeInMB}MB!`);
  }
  return isSmallEnough;
};
