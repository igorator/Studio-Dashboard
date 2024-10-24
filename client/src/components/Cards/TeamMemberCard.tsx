import { App, Button, Card, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import { TeamMember } from '../../data/types';
import { routes } from '../../data/routes-config';
import { useDeleteTeamMemberMutation } from '../../redux/services/teamApi'; // Импортируйте ваш хуку для удаления членов команды
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import imagePlaceholder from '../../assets/image-placeholder.webp'; // Импортируйте изображение-заполнитель
import { CustomModal } from '../CustomModal'; // Импортируйте ваш модальный компонент

type TeamMemberCardProps = {
  member: TeamMember;
  onDelete: () => void;
};

export const TeamMemberCard = ({ member, onDelete }: TeamMemberCardProps) => {
  const { message } = App.useApp();
  const [deleteTeamMember] = useDeleteTeamMemberMutation(); // Хук для удаления члена команды
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteTeamMember(member.id).unwrap(); // Удаление члена команды
      message.success('Team member deleted');
      onDelete(); // Обновите список членов команды
    } catch (err) {
      console.error('Failed to delete the team member:', err);
      message.error('Unable to delete team member');
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
            member.photo_id === null
              ? imagePlaceholder
              : `${import.meta.env.VITE_API_URL}/media/${member.photo_id}`
          }
          alt={member.name_eng} // Альтернативный текст для изображения
        />
      }
    >
      <Flex vertical>
        <h3>{member.name_eng}</h3>
        <p>{member.jobTitle_eng}</p> {/* Заголовок работы члена команды */}
      </Flex>

      <Flex justify='between' gap={16} align='center'>
        <Button
          type='primary'
          onClick={() => navigate(`${routes.team.path}/${member.id}`)} // Переход к странице редактирования члена команды
          icon={<EditOutlined />}
        />
        <CustomModal
          title='Team Member Deleting'
          message='Are you sure you want to delete this team member?'
          onOkAction={handleDelete} // Обработчик удаления
          trigger={<DeleteOutlined />} // Триггер для открытия модального окна
        />
      </Flex>
    </Card>
  );
};
