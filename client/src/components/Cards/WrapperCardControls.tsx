import { PlusOutlined, OrderedListOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';

export const WrapperCardControls = () => {
  return (
    <Flex gap={16}>
      <Button>
        <PlusOutlined />
      </Button>

      <Button>
        <OrderedListOutlined />
      </Button>
    </Flex>
  );
};
