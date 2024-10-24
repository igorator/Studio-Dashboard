import { useState, useEffect } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { App, Upload, GetProp, UploadProps, UploadFile } from 'antd';
import { isValidImageFormat } from '../../utils/files/isValidImageFormat';
import { isValidImageSize } from '../../utils/files/isValidImageSize';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const CoverUpload: React.FC<{
  onChange?: (file: FileType | null) => void;
  initialCoverId?: number | null;
}> = ({ onChange, initialCoverId }) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { message } = App.useApp();

  useEffect(() => {
    if (initialCoverId) {
      const initialFiles = [
        {
          uid: 'cover',
          name: 'cover',
          status: 'done' as UploadFile['status'],
          url: `${import.meta.env.VITE_API_URL}/media/${initialCoverId}`,
          thumbUrl: `${import.meta.env.VITE_API_URL}/media/${initialCoverId}`,
        },
      ];
      setFileList(initialFiles);
    }
  }, [initialCoverId]);

  const beforeUpload = (file: UploadFile) => {
    const validFormat = isValidImageFormat(file);
    const validSize = isValidImageSize(file, 4);

    if (!validFormat) {
      message.error(
        'Invalid image format. Allowed formats: .jpg, .png, .webp, .jpeg.',
      );
    }

    if (!validSize) {
      message.error('Image size exceeds the 4MB limit.');
    }

    return validFormat && validSize;
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    const { fileList } = info;

    // Если файл загружается
    if (info.file.status === 'uploading') {
      setLoading(true);
    }

    // Если загрузка завершена
    if (info.file.status === 'done') {
      setLoading(false);
      setFileList(fileList);
      onChange?.(fileList[0].originFileObj as FileType);
    } else if (info.file.status === 'error') {
      setLoading(false);
      message.error('Upload failed');
    }
  };

  const handleRemove = (file: UploadFile) => {
    const newFileList = fileList.filter((f) => f.uid !== file.uid);
    setFileList(newFileList);
    onChange?.(null);
  };

  const handleCustomRequest = (info) => {
    const { file, onSuccess, onError } = info;

    console.log('Custom request for file:', file);
    setLoading(true);

    // Имитируем загрузку
    setTimeout(() => {
      console.log('Simulating upload...');
      const isSuccess = true;

      if (isSuccess) {
        const newFileList = [
          {
            uid: file.uid,
            name: file.name,
            status: 'done' as UploadFile['status'],
            url: URL.createObjectURL(file),
            thumbUrl: URL.createObjectURL(file),
            originFileObj: file,
          },
        ];

        setFileList(newFileList);
        onChange?.(file);
        onSuccess(file);
        console.log('Upload successful');
      } else {
        onError(new Error('Upload error'));
        console.log('Upload failed');
      }

      setLoading(false);
    }, 1000);
  };

  const uploadButton = (
    <button
      style={{ border: 0, background: 'none', color: 'inherit' }}
      type='button'
      disabled={loading}
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Upload
      maxCount={1}
      name='cover'
      accept='image/png, image/jpeg, image/webp, image/gif'
      listType='picture-card'
      onRemove={handleRemove}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      fileList={fileList}
      customRequest={handleCustomRequest}
    >
      {uploadButton}
    </Upload>
  );
};
