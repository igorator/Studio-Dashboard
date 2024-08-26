import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { Project } from '../../data/types';
import { routes } from '../../data/routes-config';

export const ProjectCard = ({ project }: { project: Project }) => {
  const { Meta } = Card;
  return (
    <Link to={`${routes.projects.path}/${project.id}`} key={project.id}>
      <Card
        hoverable
        style={{ width: 300, cursor: 'pointer' }}
        cover={<img alt={project.title} src={project.cover} />}
      >
        <Meta title={project.title} description={project.description} />
      </Card>
    </Link>
  );
};
