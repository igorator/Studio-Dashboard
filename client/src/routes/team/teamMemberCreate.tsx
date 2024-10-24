import { WrapperCard } from '../../components/Cards/WrapperCard';
import { TeamForm } from '../../components/Forms/TeamForm';

export function TeamMemberCreate() {
  return (
    <WrapperCard title={'Create Team Member'}>
      <TeamForm />
    </WrapperCard>
  );
}
