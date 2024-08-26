import { useEffect, useState } from 'react';
import { Flex, Alert } from 'antd';
import { getProjects } from '../../api/projects/getProjects';
import { Project } from '../../data/types';
import { Outlet, useLocation } from 'react-router-dom';
import { LoadingState } from '../../data/types';
import { WrapperCard } from '../../components/Cards/WrapperCard';
import { ProjectCard } from '../../components/Cards/ProjectCard';
import { ProjectSkeleton } from '../../components/Skeletons/ProjectSkeleton';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<LoadingState>(LoadingState.Idle);
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/projects/');

  useEffect(() => {
    const fetchProjects = async () => {
      setStatus(LoadingState.Loading);
      try {
        const data = await getProjects();
        setProjects(data);
        setStatus(LoadingState.Success);
      } catch (error) {
        setStatus(LoadingState.Error);
      }
    };

    fetchProjects();
  }, []);

  if (isDetailPage) return <Outlet />;

  return (
    <WrapperCard title='Projects'>
      {status === LoadingState.Loading && (
        <Flex gap={16} wrap justify='space-between'>
          {Array.from({ length: 5 }).map(() => (
            <ProjectSkeleton />
          ))}
        </Flex>
      )}

      {status === LoadingState.Error && (
        <Alert
          message='Error'
          description='Failed to fetch projects'
          type='error'
        />
      )}

      {status === LoadingState.Success && (
        <Flex>
          {projects.map((project) => (
            <ProjectCard project={project} />
          ))}
        </Flex>
      )}
    </WrapperCard>
  );
}
