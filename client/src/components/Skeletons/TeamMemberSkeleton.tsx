import { Card, Skeleton } from 'antd';

export const TeamMemberSkeleton = () => {
  return (
    <Card
      hoverable
      style={{ width: 300, cursor: 'pointer' }}
      cover={<Skeleton.Image active />}
    >
      <Skeleton active title={true} paragraph={{ rows: 2 }} />
    </Card>
  );
};
