import { UploadFile } from 'antd';

export const isValidImageFormat = (file: UploadFile) => {
  const validFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const fileType = file.type;

  const isValid = fileType ? validFormats.includes(fileType) : false;

  return isValid;
};
