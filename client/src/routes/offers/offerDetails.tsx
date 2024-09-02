import { useParams } from 'react-router-dom';
import { Card, Spin, Alert } from 'antd';
import { useGetOfferByIdQuery } from '../../redux/services/offerApi';

export function OfferDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: offer, error, isLoading } = useGetOfferByIdQuery(id!);

  if (isLoading) return <Spin size='large' />;
  if (error)
    return (
      <Alert message='Error' description='Failed to fetch offer' type='error' />
    );
  if (!offer) return <p>Offer not found</p>;

  return (
    <Card title={offer.title} style={{ height: '100%', marginTop: '20px' }}>
      <img alt={offer.title} src={offer.animation} style={{ width: '100%' }} />
      <p>{offer.description}</p>
    </Card>
  );
}
