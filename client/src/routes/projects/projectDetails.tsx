import { useNavigate, useParams } from 'react-router-dom';
import { Spin, Alert, App } from 'antd';
import {
  useDeleteProjectMutation,
  useGetProjectByIdQuery,
} from '../../redux/services/projectApi';
import { WrapperCard } from '../../components/Cards/WrapperCard';
import { ProjectForm } from '../../components/Forms/ProjectForm';
import { CustomModal } from '../../components/CustomModal';
import { DeleteOutlined } from '@ant-design/icons';
import { routes } from '../../data/routes-config';

export function ProjectDetails() {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [deleteProject] = useDeleteProjectMutation();
  const {
    data: project,
    error,
    isLoading,
    refetch,
  } = useGetProjectByIdQuery(id!);

  const handleDelete = async () => {
    try {
      await deleteProject(project.id).unwrap();
      message.success('Project deleted');
      navigate(`${routes.projects.path}`);
    } catch (err) {
      console.error('Failed to delete the project:', err);
      message.error('Unable to delete project');
    }
  };

  if (isLoading) return <Spin size='large' />;
  if (error)
    return (
      <Alert
        message='Error'
        description='Failed to fetch project'
        type='error'
      />
    );
  if (!project) return <p>Project not found</p>;

  return (
    <WrapperCard
      title={'Edit Project'}
      controls={
        <CustomModal
          title='Project Deleting'
          message='Are you sure you want to delete project?'
          onOkAction={handleDelete}
          trigger={<DeleteOutlined />}
        />
      }
    >
      <ProjectForm project={project} refetchProject={refetch} />
    </WrapperCard>
  );
}
