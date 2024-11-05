import { Alert, Flex, Button } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  PlusOutlined,
  OrderedListOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useGetProjectsQuery } from '../../redux/services/projectApi';
import { WrapperCard } from '../../components/Cards/WrapperCard';
import { ProjectCard } from '../../components/Cards/ProjectCard';
import { ProjectSkeleton } from '../../components/Skeletons/ProjectSkeleton';
import { routes } from '../../data/routes-config';
import { Project } from '../../data/types';

export function Projects() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDetailsPage = location.pathname.includes(`${routes.projects.path}/`);

  const {
    data: projects = [],
    error,
    isLoading,
    refetch,
  } = useGetProjectsQuery([]);

  if (isDetailsPage) return <Outlet context={{ projects, refetch }} />;

  return (
    <WrapperCard
      title='Projects'
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
              navigate(`${routes.projects.path}/create`);
            }}
            icon={<PlusOutlined />}
          />

          <Button
            disabled={isLoading}
            onClick={() => {
              navigate(`${routes.projects.path}/reorder`);
            }}
            icon={<OrderedListOutlined />}
          />
        </Flex>
      }
    >
      {isLoading && (
        <Flex gap={16} wrap justify='space-between'>
          {new Array(6).fill(null).map((_, index) => (
            <ProjectSkeleton key={index} />
          ))}
        </Flex>
      )}

      {error && (
        <Alert
          message='Error'
          description='Failed to fetch projects'
          type='error'
        />
      )}

      {!isLoading && !error && (
        <Flex wrap gap={32}>
          {projects.map((project: Project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={refetch}
            />
          ))}
        </Flex>
      )}
    </WrapperCard>
  );
}
