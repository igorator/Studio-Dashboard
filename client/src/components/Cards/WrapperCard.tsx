import { Card } from 'antd';
import { WrapperCardControls } from './WrapperCardControls';

export function WrapperCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      title={title}
      style={{ width: '100%', height: '100%', marginTop: 20 }}
      extra={<WrapperCardControls />}
    >
      {children}
    </Card>
  );
}
