import { App, Button, Card, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Project } from '../../data/types';
import { routes } from '../../data/routes-config';
import { useDeleteProjectMutation } from '../../redux/services/projectApi';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import imagePlaceholder from '../../assets/image-placeholder.webp';
import { CustomModal } from '../CustomModal';

type ProjectCardProps = {
  project: Project;
  onDelete: () => void;
};

export const ProjectCard = ({ project, onDelete }: ProjectCardProps) => {
  const { message } = App.useApp();
  const [deleteProject] = useDeleteProjectMutation();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteProject(project.id).unwrap();
      message.success('Project deleted');
      onDelete();
    } catch (err) {
      console.error('Failed to delete the project:', err);
      ('Unable to delete project');
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
            project.cover_id === null
              ? imagePlaceholder
              : `${import.meta.env.VITE_API_URL}/media/${project.cover_id}`
          }
        />
      }
    >
      <Flex vertical>
        <h3>{project.title_eng}</h3>
        <p>{project.description_eng}</p>
      </Flex>

      <Flex justify='between' gap={16} align='center'>
        <Button
          type='primary'
          onClick={() => navigate(`${routes.projects.path}/${project.id}`)}
          icon={<EditOutlined />}
        />
        <CustomModal
          title='Project Deleting'
          message='Are you sure you want to delete project?'
          onOkAction={handleDelete}
          trigger={<DeleteOutlined />}
        />
      </Flex>
    </Card>
  );
};
