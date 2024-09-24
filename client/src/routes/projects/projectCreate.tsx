import { WrapperCard } from '../../components/Cards/WrapperCard/WrapperCard';
import { ProjectCreateForm } from '../../components/Forms/create/projectCreateForm';

export function ProjectCreate() {
  return (
    <WrapperCard entityType='general' title={'Create Project'}>
      <ProjectCreateForm />
    </WrapperCard>
  );
}
