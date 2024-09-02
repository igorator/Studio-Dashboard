import { useParams } from 'react-router-dom';
import { Card, Spin, Alert } from 'antd';
import { useGetTeamMemberByIdQuery } from '../../redux/services/teamApi';

export function TeamMemberDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: teamMember, error, isLoading } = useGetTeamMemberByIdQuery(id!);

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
    <Card title={teamMember.name} style={{ height: '100%', marginTop: '20px' }}>
      <img
        alt={teamMember.name}
        src={teamMember.photo}
        style={{ width: '100%' }}
      />
      <p>{teamMember.jobTitle}</p>
    </Card>
  );
}
