import { message, UploadFile } from 'antd';

export const isValidImageFormat = (file: UploadFile) => {
  const validFormats = ['image/jpeg', 'image/png', 'image/webp'];
  const fileType = file.type;

  const isValid = fileType ? validFormats.includes(fileType) : false;
  if (!isValid) {
    message.error('You can only upload JPG/PNG/WEBP files!');
  }
  return isValid;
};
