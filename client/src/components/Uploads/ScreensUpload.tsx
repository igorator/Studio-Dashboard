import { useState, useEffect } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { App, Upload, UploadProps, Button, UploadFile } from 'antd';
import { isValidImageFormat } from '../../utils/files/isValidImageFormat';
import { isValidImageSize } from '../../utils/files/isValidImageSize';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DraggableUploadListItem = ({
  originNode,
  file,
}: {
  originNode: React.ReactElement;
  file: UploadFile;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: file.uid,
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'grab',
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? 'is-dragging' : ''}
      {...attributes}
      {...listeners}
    >
      {originNode}
    </div>
  );
};

export const ScreensUpload: React.FC<{
  onChange?: (fileList: UploadFile[]) => void;
  initialScreensIds?: number[];
}> = ({ onChange, initialScreensIds }) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { message } = App.useApp();

  useEffect(() => {
    if (initialScreensIds) {
      const initialFiles = initialScreensIds.map(
        (screen_id: number, index) => ({
          uid: `screen-${screen_id} №${index + 1}`,
          name: `Screen ${screen_id} №${index + 1}`,
          status: 'done' as UploadFile['status'],
          url: `${import.meta.env.VITE_API_URL}/media/${screen_id}`,
          thumbUrl: `${import.meta.env.VITE_API_URL}/media/${screen_id}`,
        }),
      );
      setFileList(initialFiles);
    }
  }, [initialScreensIds]);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

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

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      setFileList((prev) => {
        const activeIndex = prev.findIndex((i) => i.uid === active.id);
        const overIndex = prev.findIndex((i) => i.uid === over.id);

        if (activeIndex !== -1 && overIndex !== -1) {
          const updatedFileList = arrayMove(prev, activeIndex, overIndex);
          onChange?.(updatedFileList);
          return updatedFileList;
        }

        return prev;
      });
    }
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    } else if (info.file.status === 'done') {
      setLoading(false);
      const updatedFileList = [...info.fileList];
      setFileList(updatedFileList);
      onChange?.(updatedFileList);
    } else if (info.file.status === 'error') {
      setLoading(false);
      message.error('Upload failed');
    }
  };

  const handleRemove = (file: UploadFile) => {
    const newFileList = fileList.filter((f) => f.uid !== file.uid);
    setFileList(newFileList);
    onChange?.(newFileList); // Call onChange after updating the state
  };

  const handleCustomRequest = (info) => {
    const { file, onSuccess, onError } = info;

    setLoading(true);
    const isSuccess = true;
    if (isSuccess) {
      const updatedFileList = [file, ...fileList];
      console.log(updatedFileList);
      setFileList(updatedFileList);
      onChange?.(updatedFileList);
      onSuccess(file);
    } else {
      onError(new Error('Upload error'));
    }
    setLoading(false);
  };

  const uploadButton = (
    <Button
      type='primary'
      style={{ marginTop: 8 }}
      icon={loading ? <LoadingOutlined /> : <PlusOutlined />}
      disabled={loading}
    >
      Upload
    </Button>
  );

  return (
    <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
      <SortableContext
        items={fileList.map((i) => i.uid)}
        strategy={verticalListSortingStrategy}
      >
        <Upload
          multiple
          name='screens'
          accept='image/*'
          listType='picture'
          maxCount={4}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          fileList={fileList}
          onRemove={handleRemove}
          customRequest={handleCustomRequest}
          itemRender={(originNode, file) => (
            <DraggableUploadListItem originNode={originNode} file={file} />
          )}
        >
          {fileList.length < 4 && uploadButton}
        </Upload>
      </SortableContext>
    </DndContext>
  );
};
