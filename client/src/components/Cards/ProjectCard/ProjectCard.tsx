import { Card } from 'antd';
import { Project } from '../../../data/types';

export const ProjectCard = (project: Project) => {
  return <Card title={project.title}></Card>;
};
