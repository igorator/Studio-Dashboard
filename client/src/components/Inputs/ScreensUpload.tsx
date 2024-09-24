import { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload, UploadProps, Button, UploadFile } from 'antd';
import { isValidImageFormat } from '../../helpers/files/isValidImageFormat';
import { isValidImageSize } from '../../helpers/files/isValidImageSize';
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
}> = ({ onChange }) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      setFileList((prev) => {
        const activeIndex = prev.findIndex((i) => i.uid === active.id);
        const overIndex = prev.findIndex((i) => i.uid === over.id);

        if (activeIndex !== -1 && overIndex !== -1) {
          const updatedFileList = arrayMove(prev, activeIndex, overIndex);

          console.log('Updated FileList:', updatedFileList);

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

      const updatedFileList = [...fileList, info.file as UploadFile];
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
    onChange?.(newFileList);
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
          accept='.jpg, .png, .webp, .jpeg'
          listType='picture'
          maxCount={4}
          beforeUpload={beforeUpload}
          customRequest={({ onSuccess }) =>
            setTimeout(() => {
              onSuccess?.('ok');
            }, 1000)
          }
          onChange={handleChange}
          onRemove={handleRemove}
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
