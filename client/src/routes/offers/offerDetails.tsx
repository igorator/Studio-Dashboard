import { useNavigate, useParams } from 'react-router-dom';
import { Spin, Alert, App } from 'antd';
import {
  useDeleteOfferMutation,
  useGetOfferByIdQuery,
} from '../../redux/services/offerApi';
import { WrapperCard } from '../../components/Cards/WrapperCard';
import { OfferForm } from '../../components/Forms/OfferForm';
import { CustomModal } from '../../components/CustomModal';
import { DeleteOutlined } from '@ant-design/icons';
import { routes } from '../../data/routes-config';

export function OfferDetails() {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [deleteOffer] = useDeleteOfferMutation();
  const { data: offer, error, isLoading, refetch } = useGetOfferByIdQuery(id!);

  const handleDelete = async () => {
    try {
      await deleteOffer(offer!.id).unwrap();
      message.success('Offer deleted');
      navigate(`${routes.offers.path}`);
    } catch (err) {
      console.error('Failed to delete the offer:', err);
      message.error('Unable to delete offer');
    }
  };

  if (isLoading) return <Spin size='large' />;
  if (error)
    return (
      <Alert message='Error' description='Failed to fetch offer' type='error' />
    );
  if (!offer) return <p>Offer not found</p>;

  return (
    <WrapperCard
      title={'Edit Offer'}
      controls={
        <CustomModal
          title='Offer Deleting'
          message='Are you sure you want to delete this offer?'
          onOkAction={handleDelete}
          trigger={<DeleteOutlined />}
        />
      }
    >
      <OfferForm offer={offer} refetchOffer={refetch} />
    </WrapperCard>
  );
}
