import { Card, Skeleton } from 'antd';

export const OfferSkeleton = () => {
  return (
    <Card
      hoverable
      style={{ width: 300, cursor: 'pointer' }}
      cover={<Skeleton.Image active />}
    >
      <Skeleton active title={true} paragraph={{ rows: 3 }} />
    </Card>
  );
};
