import { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { App, Upload, GetProp, UploadProps } from 'antd';
import { getBase64 } from '../../utils/files/getBase64';
import { isValidImageFormat } from '../../utils/files/isValidImageFormat';
import { isValidImageSize } from '../../utils/files/isValidImageSize';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const beforeUpload = (file: FileType) => {
  const validFormat = isValidImageFormat(file);
  const validSize = isValidImageSize(file, 4);

  return validFormat && validSize;
};

export const CoverUpload: React.FC<{
  onChange?: (filelist: FileType) => void;
}> = ({ onChange }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const { message } = App.useApp();

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    } else if (info.file.status === 'done') {
      onChange?.(info.fileList[0] as FileType);

      getBase64(info.file.originFileObj as FileType)
        .then((url) => {
          setLoading(false);
          setImageUrl(url);
        })
        .catch(() => {
          setLoading(false);
          message.error('Failed to get the image URL');
        });
    } else if (info.file.status === 'error') {
      setLoading(false);
      message.error('Upload failed');
    }
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
      name='avatar'
      accept='image/png, image/jpeg, image/webp, image/gif'
      listType='picture-card'
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      customRequest={({ onSuccess }) =>
        setTimeout(() => {
          onSuccess?.('ok');
        }, 1000)
      }
    >
      {imageUrl ? (
        <img src={imageUrl} alt='avatar' style={{ width: '70%' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};
