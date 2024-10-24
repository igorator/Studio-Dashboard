import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { DndList } from '../../components/Tables/DndList';
import { WrapperCard } from '../../components/Cards/WrapperCard';
import { TeamMember } from '../../data/types';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Space, Flex } from 'antd';
import imagePlaceholder from '../../assets/image-placeholder.webp';
import { useReorderTeamMembersMutation } from '../../redux/services/teamApi';

export function TeamMembersReorder() {
  const { teamMembers = [], refetch } = useOutletContext<{
    teamMembers: TeamMember[] | undefined;
    refetch: () => void;
  }>();

  const [currentOrder, setCurrentOrder] = useState<TeamMember[]>([]);
  const [initialOrder, setInitialOrder] = useState<TeamMember[]>([]);
  const [updateTeamMemberOrder, { isLoading }] =
    useReorderTeamMembersMutation();
  const [isDragged, setIsDragged] = useState(false);

  useEffect(() => {
    if (teamMembers && teamMembers.length > 0) {
      setCurrentOrder(teamMembers);
      setInitialOrder(teamMembers);
    }
  }, [teamMembers]);

  const handleReorder = (newOrder: TeamMember[]) => {
    setCurrentOrder(newOrder);
    setIsDragged(true);
  };

  const handleConfirm = async () => {
    try {
      const orderedMembers = currentOrder.map((member, index) => ({
        id: member.id,
        order_number: index + 1, // Присваиваем новый порядок
      }));

      // Логируем данные, которые отправляются
      console.log('Sending ordered members:', JSON.stringify(orderedMembers));

      // Отправляем запрос на сервер с обновленным порядком
      const response = await updateTeamMemberOrder(orderedMembers).unwrap();

      console.log('Confirmed order response:', response); // Логируем успешный ответ

      // Обновляем список членов команды
      refetch();
      setIsDragged(false);
    } catch (error) {
      console.error('Failed to update team member order:', error);
    }
  };

  const handleCancel = () => {
    setCurrentOrder(initialOrder);
    setIsDragged(false);
  };

  return (
    <WrapperCard
      title='Team Members Reorder'
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
        renderItem={(member) => (
          <Flex
            key={member.id}
            align='center'
            gap={24}
            style={{ marginTop: 16, cursor: 'grab' }}
          >
            <img
              src={
                `${import.meta.env.VITE_API_URL}/media/${member.photo_id}` ||
                imagePlaceholder
              }
              alt={member.name_eng}
              style={{
                width: 50,
                height: 50,
                marginRight: 10,
                objectFit: 'cover',
              }}
            />
            <span>{member.name_eng}</span>
          </Flex>
        )}
      />
    </WrapperCard>
  );
}
