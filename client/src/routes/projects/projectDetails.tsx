import { useParams } from 'react-router-dom';
import { Card, Spin, Alert } from 'antd';
import { useGetProjectByIdQuery } from '../../redux/services/projectApi';

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: project, error, isLoading } = useGetProjectByIdQuery(id!);

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
    <Card title={project.title} style={{ height: '100%', marginTop: '20px' }}>
      <img alt={project.title} src={project.cover} style={{ width: '100%' }} />
      <p>{project.description}</p>
    </Card>
  );
}
