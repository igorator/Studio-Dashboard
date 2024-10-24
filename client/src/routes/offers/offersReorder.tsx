import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { DndList } from '../../components/Tables/DndList';
import { WrapperCard } from '../../components/Cards/WrapperCard';
import { Offer } from '../../data/types';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Space, Flex } from 'antd';
import imagePlaceholder from '../../assets/image-placeholder.webp';
import { useUpdateOfferOrderMutation } from '../../redux/services/offerApi';

export function OffersReorder() {
  const { offers = [], refetch } = useOutletContext<{
    offers: Offer[] | undefined;
    refetch: () => void;
  }>();

  const [currentOrder, setCurrentOrder] = useState<Offer[]>([]);
  const [initialOrder, setInitialOrder] = useState<Offer[]>([]);
  const [updateOfferOrder, { isLoading }] = useUpdateOfferOrderMutation();
  const [isDragged, setIsDragged] = useState(false);

  useEffect(() => {
    if (offers && offers.length > 0) {
      setCurrentOrder(offers);
      setInitialOrder(offers);
    }
  }, [offers]);

  const handleReorder = (newOrder: Offer[]) => {
    setCurrentOrder(newOrder);
    setIsDragged(true);
  };

  const handleConfirm = async () => {
    try {
      const orderedOffers = currentOrder.map((offer, index) => ({
        id: offer.id,
        order_number: index + 1, // Присваиваем новый порядок
      }));

      // Логируем данные, которые отправляются
      console.log('Sending ordered offers:', JSON.stringify(orderedOffers));

      // Отправляем запрос на сервер с обновленным порядком
      const response = await updateOfferOrder(orderedOffers).unwrap();

      console.log('Confirmed order response:', response); // Логируем успешный ответ

      // Обновляем список предложений
      refetch();
      setIsDragged(false);
    } catch (error) {
      console.error('Failed to update offer order:', error);
    }
  };

  const handleCancel = () => {
    setCurrentOrder(initialOrder);
    setIsDragged(false);
  };

  return (
    <WrapperCard
      title='Offers Reorder'
      controls={
        <Space>
          <Button
            type='primary'
            icon={<CheckOutlined />}
            onClick={handleConfirm}
            disabled={!isDragged || isLoading}
          >
            Confirm
          </Button>
          <Button
            icon={<CloseOutlined />}
            onClick={handleCancel}
            disabled={!isDragged || isLoading}
          >
            Cancel
          </Button>
        </Space>
      }
    >
      <DndList
        items={currentOrder}
        onChange={handleReorder}
        renderItem={(offer) => (
          <Flex
            key={offer.id}
            align='center'
            gap={24}
            style={{ marginTop: 16, cursor: 'grab' }}
          >
            <img
              src={
                `${import.meta.env.VITE_API_URL}/media/${offer.cover_id}` ||
                imagePlaceholder
              }
              alt={offer.title_eng}
              style={{
                width: 50,
                height: 50,
                marginRight: 10,
                objectFit: 'cover',
              }}
            />
            <span>{offer.title_eng}</span>
          </Flex>
        )}
      />
    </WrapperCard>
  );
}
