import { Alert, Flex, Button } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  PlusOutlined,
  OrderedListOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useGetTeamMembersQuery } from '../../redux/services/teamApi';
import { WrapperCard } from '../../components/Cards/WrapperCard';
import { TeamMemberCard } from '../../components/Cards/TeamMemberCard';
import { TeamMemberSkeleton } from '../../components/Skeletons/TeamMemberSkeleton';
import { routes } from '../../data/routes-config';
import { TeamMember } from '../../data/types';

export function Team() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDetailsPage = location.pathname.includes(`${routes.team.path}/`);

  const {
    data: teamMembers = [],
    error,
    isLoading,
    refetch,
  } = useGetTeamMembersQuery([]);

  if (isDetailsPage) return <Outlet context={{ teamMembers, refetch }} />;

  return (
    <WrapperCard
      title='Team'
      controls={
        <Flex gap={16}>
          <Button
            onClick={refetch}
            disabled={isLoading}
            icon={<ReloadOutlined />}
          />

          <Button
            disabled={isLoading}
            onClick={() => {
              navigate(`${routes.team.path}/create`);
            }}
            icon={<PlusOutlined />}
          />

          <Button
            disabled={isLoading}
            onClick={() => {
              navigate(`${routes.team.path}/reorder`);
            }}
            icon={<OrderedListOutlined />}
          />
        </Flex>
      }
    >
      {isLoading && (
        <Flex gap={16} wrap justify='space-between'>
          {new Array(6).fill(null).map((_, index) => (
            <TeamMemberSkeleton key={index} />
          ))}
        </Flex>
      )}

      {error && (
        <Alert
          message='Error'
          description='Failed to fetch team members'
          type='error'
        />
      )}

      {!isLoading && !error && (
        <Flex wrap gap={32}>
          {teamMembers.map((member: TeamMember) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onDelete={refetch}
            />
          ))}
        </Flex>
      )}
    </WrapperCard>
  );
}
