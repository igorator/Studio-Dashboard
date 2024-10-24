import { Alert, Flex, Button } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  PlusOutlined,
  OrderedListOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useGetOffersQuery } from '../../redux/services/offerApi';
import { WrapperCard } from '../../components/Cards/WrapperCard';
import { OfferCard } from '../../components/Cards/OfferCard';
import { OfferSkeleton } from '../../components/Skeletons/OfferSkeleton';
import { routes } from '../../data/routes-config';
import { Offer } from '../../data/types';

export function Offers() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDetailsPage = location.pathname.includes(`${routes.offers.path}/`);

  const {
    data: offers = [],
    error,
    isLoading,
    refetch,
  } = useGetOffersQuery([]);

  if (isDetailsPage) return <Outlet context={{ offers, refetch }} />;

  return (
    <WrapperCard
      title='Offers'
      controls={
        <Flex gap={16}>
          <Button
            onClick={refetch}
            disabled={isLoading}
            icon={<ReloadOutlined />}
          />

          <Button
            disabled={isLoading}
            onClick={() => {
              navigate(`${routes.offers.path}/create`);
            }}
            icon={<PlusOutlined />}
          />

          <Button
            disabled={isLoading}
            onClick={() => {
              navigate(`${routes.offers.path}/reorder`);
            }}
            icon={<OrderedListOutlined />}
          />
        </Flex>
      }
    >
      {isLoading && (
        <Flex gap={16} wrap justify='space-between'>
          {new Array(6).fill(null).map((_, index) => (
            <OfferSkeleton key={index} />
          ))}
        </Flex>
      )}

      {error && (
        <Alert
          message='Error'
          description='Failed to fetch offers'
          type='error'
        />
      )}

      {!isLoading && !error && (
        <Flex wrap gap={32}>
          {offers.map((offer: Offer) => (
            <OfferCard key={offer.id} offer={offer} onDelete={refetch} />
          ))}
        </Flex>
      )}
    </WrapperCard>
  );
}
