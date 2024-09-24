import { Alert, Flex } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import { useGetProjectsQuery } from '../../redux/services/projectApi';
import { WrapperCard } from '../../components/Cards/WrapperCard/WrapperCard';
import { ProjectCard } from '../../components/Cards/ProjectCard';
import { ProjectSkeleton } from '../../components/Skeletons/ProjectSkeleton';
import { routes } from '../../data/routes-config';

export function Projects() {
  const location = useLocation();
  const isDetailsPage = location.pathname.includes(`${routes.projects.path}/`);

  const {
    data: projects = [],
    error,
    isLoading,
    refetch,
  } = useGetProjectsQuery();

  const handleProjectDelete = () => {
    refetch();
  };

  if (isDetailsPage) return <Outlet />;

  return (
    <WrapperCard title='Projects' entityType='projects'>
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
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={handleProjectDelete}
            />
          ))}
        </Flex>
      )}
    </WrapperCard>
  );
}
