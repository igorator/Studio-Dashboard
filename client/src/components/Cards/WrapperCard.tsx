import { Card } from 'antd';
import { WrapperCardProps } from '../../data/types';

export function WrapperCard({ title, controls, children }: WrapperCardProps) {
  return (
    <Card
      bordered={false}
      title={title}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
      extra={controls}
    >
      {children}
    </Card>
  );
}
