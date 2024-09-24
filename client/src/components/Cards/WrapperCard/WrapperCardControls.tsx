import { Button, Flex } from 'antd';
import { PlusOutlined, OrderedListOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { WrapperCardControlsProps } from '../../../data/types';

export const WrapperCardControls = ({
  entityType,
}: WrapperCardControlsProps) => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate(`/${entityType}/create`);
  };

  const handleReorderClick = () => {
    navigate(`/${entityType}/reorder`);
  };

  if (
    entityType === 'leads' ||
    entityType === 'dashboard' ||
    entityType === 'general'
  ) {
    return null;
  }

  return (
    <Flex gap={16}>
      <Button onClick={handleAddClick}>
        <PlusOutlined />
      </Button>
      <Button onClick={handleReorderClick}>
        <OrderedListOutlined />
      </Button>
    </Flex>
  );
};
