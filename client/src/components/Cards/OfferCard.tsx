import { App, Button, Card, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Offer } from '../../data/types';
import { routes } from '../../data/routes-config';
import { useDeleteOfferMutation } from '../../redux/services/offerApi';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import imagePlaceholder from '../../assets/image-placeholder.webp';
import { CustomModal } from '../CustomModal';

type OfferCardProps = {
  offer: Offer;
  onDelete: () => void;
};

export const OfferCard = ({ offer, onDelete }: OfferCardProps) => {
  const { message } = App.useApp();
  const [deleteOffer] = useDeleteOfferMutation();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteOffer(offer.id).unwrap();
      message.success('Offer deleted');
      onDelete();
    } catch (err) {
      console.error('Failed to delete the offer:', err);
      message.error('Unable to delete offer');
    }
  };

  return (
    <Card
      hoverable
      style={{
        cursor: 'default',
        width: 300,
      }}
      cover={
        <img
          style={{
            maxHeight: 300,
            objectFit: 'cover',
            aspectRatio: '16 / 9',
          }}
          src={
            offer.cover_id === null
              ? imagePlaceholder
              : `${import.meta.env.VITE_API_URL}/media/${offer.cover_id}`
          }
        />
      }
    >
      <Flex vertical>
        <h3>{offer.title_eng}</h3>
        <p>{offer.description_eng}</p>
      </Flex>

      <Flex justify='between' gap={16} align='center'>
        <Button
          type='primary'
          onClick={() => navigate(`${routes.offers.path}/${offer.id}`)}
          icon={<EditOutlined />}
        />

        <CustomModal
          title='Offer Deleting'
          message='Are you sure you want to delete this offer?'
          onOkAction={handleDelete}
          trigger={<DeleteOutlined />}
        />
      </Flex>
    </Card>
  );
};
