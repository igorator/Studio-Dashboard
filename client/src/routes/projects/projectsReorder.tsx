import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { DndList } from '../../components/Tables/DndList';
import { WrapperCard } from '../../components/Cards/WrapperCard';
import { Project } from '../../data/types';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Space, Flex } from 'antd';
import imagePlaceholder from '../../assets/image-placeholder.webp';
import { useUpdateProjectOrderMutation } from '../../redux/services/projectApi';

export function ProjectsReorder() {
  const { projects = [], refetch } = useOutletContext<{
    projects: Project[] | undefined;
    refetch: () => void;
  }>();

  const [currentOrder, setCurrentOrder] = useState<Project[]>([]);
  const [initialOrder, setInitialOrder] = useState<Project[]>([]);
  const [updateProjectOrder, { isLoading }] = useUpdateProjectOrderMutation();
  const [isDragged, setIsDragged] = useState(false);

  useEffect(() => {
    if (projects && projects.length > 0) {
      setCurrentOrder(projects);
      setInitialOrder(projects);
    }
  }, [projects]);

  const handleReorder = (newOrder: Project[]) => {
    setCurrentOrder(newOrder);
    setIsDragged(true);
  };

  const handleConfirm = async () => {
    try {
      const orderedProjects = currentOrder.map((project, index) => ({
        id: project.id,
        order_number: index + 1, // Назначаем новый порядок
      }));

      // Логируем данные, которые будут отправлены
      console.log('Sending ordered projects:', JSON.stringify(orderedProjects));

      // Отправляем запрос на сервер с обновленным порядком
      const response = await updateProjectOrder(orderedProjects).unwrap();

      console.log('Confirmed order response:', response); // Логируем успешный ответ

      // Обновляем проекты
      refetch();
      setIsDragged(false);
    } catch (error) {
      console.error('Failed to update project order:', error);
    }
  };

  const handleCancel = () => {
    setCurrentOrder(initialOrder);
    setIsDragged(false);
  };

  return (
    <WrapperCard
      title='Projects reorder'
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
        renderItem={(project) => (
          <Flex
            key={project.id}
            align='center'
            gap={24}
            style={{ marginTop: 16, cursor: 'grab' }}
          >
            <img
              src={
                `${import.meta.env.VITE_API_URL}/media/${project.cover_id}` ||
                imagePlaceholder
              }
              alt={project.title_eng}
              style={{
                width: 50,
                height: 50,
                marginRight: 10,
                objectFit: 'cover',
              }}
            />
            <span>{project.title_eng}</span>
          </Flex>
        )}
      />
    </WrapperCard>
  );
}
