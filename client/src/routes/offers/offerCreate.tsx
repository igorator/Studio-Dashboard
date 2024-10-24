import { WrapperCard } from '../../components/Cards/WrapperCard';
import { OfferForm } from '../../components/Forms/OfferForm';

export function OfferCreate() {
  return (
    <WrapperCard title={'Create Offer'}>
      <OfferForm />
    </WrapperCard>
  );
}
