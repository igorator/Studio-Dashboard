import { WrapperCard } from '../../components/Cards/WrapperCard';
import { ProjectForm } from '../../components/Forms/ProjectForm';

export function ProjectCreate() {
  return (
    <WrapperCard title={'Create Project'}>
      <ProjectForm />
    </WrapperCard>
  );
}
