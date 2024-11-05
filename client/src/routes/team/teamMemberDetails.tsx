import { useNavigate, useParams } from 'react-router-dom';
import { Spin, Alert, App } from 'antd';
import {
  useDeleteTeamMemberMutation,
  useGetTeamMemberByIdQuery,
} from '../../redux/services/teamApi';
import { CustomModal } from '../../components/CustomModal';
import { DeleteOutlined } from '@ant-design/icons';
import { routes } from '../../data/routes-config';
import { TeamForm } from '../../components/Forms/TeamForm';
import { WrapperCard } from '../../components/Cards/WrapperCard';

export function TeamMemberDetails() {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [deleteTeamMember] = useDeleteTeamMemberMutation();
  const {
    data: teamMember,
    error,
    isLoading,
    refetch,
  } = useGetTeamMemberByIdQuery(id!);

  const handleDelete = async () => {
    try {
      await deleteTeamMember(teamMember!.id).unwrap();
      message.success('Team member deleted');
      navigate(`${routes.team.path}`);
    } catch (err) {
      console.error('Failed to delete the team member:', err);
      message.error('Unable to delete team member');
    }
  };

  if (isLoading) return <Spin size='large' />;
  if (error)
    return (
      <Alert
        message='Error'
        description='Failed to fetch team member'
        type='error'
      />
    );
  if (!teamMember) return <p>Team member not found</p>;

  return (
    <WrapperCard
      title='Edit Team member'
      controls={
        <CustomModal
          title='Team Member Deleting'
          message='Are you sure you want to delete this team member?'
          onOkAction={handleDelete}
          trigger={<DeleteOutlined />}
        />
      }
    >
      <TeamForm teamMember={teamMember} refetchTeamMember={refetch} />
    </WrapperCard>
  );
}
