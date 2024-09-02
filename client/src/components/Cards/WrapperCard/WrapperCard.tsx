import { Card } from 'antd';
import { WrapperCardControls } from './WrapperCardControls';
import { WrapperCardProps } from '../../../data/types';

export function WrapperCard({ title, entityType, children }: WrapperCardProps) {
  return (
    <Card
      title={title}
      style={{ width: '100%', height: '100%', marginTop: 20 }}
      extra={<WrapperCardControls entityType={entityType} />}
    >
      {children}
    </Card>
  );
}
