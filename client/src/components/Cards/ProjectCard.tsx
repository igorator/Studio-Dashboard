import { Card, Button, Flex } from 'antd';
import { Link } from 'react-router-dom';
import { Project } from '../../data/types';
import { routes } from '../../data/routes-config';
import { useDeleteProjectMutation } from '../../redux/services/projectApi';
import { DeleteOutlined } from '@ant-design/icons';
import { useImageFromBuffer } from '../../hooks/useImageFromBuffer';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
  onDelete: () => void; // Callback for deletion
}

export const ProjectCard = ({ project, onDelete }: ProjectCardProps) => {
  const [deleteProject] = useDeleteProjectMutation();
  const [isDeleting, setIsDeleting] = useState(false); // Состояние для отслеживания удаления

  const coverData = project.cover?.data || null;
  const { image: projectCover, loading, error } = useImageFromBuffer(coverData);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDeleting(true); // Устанавливаем флаг удаления
    try {
      await deleteProject(project.id).unwrap();
      console.log('Project deleted');
      onDelete();
    } catch (err) {
      console.error('Failed to delete the project:', err);
    } finally {
      setIsDeleting(false); // Сбрасываем флаг удаления
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (isDeleting) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Link
      to={`${routes.projects.path}/${project.id}`}
      onClick={handleCardClick}
    >
      <Card
        hoverable
        style={{
          width: 300,
          cursor: 'pointer',
          opacity: isDeleting ? 0.6 : 1, // Устанавливаем прозрачность
          pointerEvents: isDeleting ? 'none' : 'auto', // Блокируем события, если удаляется
        }}
        cover={
          loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error loading image: {error}</div>
          ) : (
            projectCover && <img alt={project.title_eng} src={projectCover} />
          )
        }
      >
        <Flex vertical>
          <h3>{project.title_eng}</h3>
          <p>{project.description_eng}</p>
        </Flex>
        <Button onClick={handleDelete} disabled={isDeleting}>
          <DeleteOutlined />
        </Button>
      </Card>
    </Link>
  );
};
