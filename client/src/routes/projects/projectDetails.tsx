import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spin, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchProjectById } from '../../redux/slices/projectSlice';

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { project, status, error } = useSelector(
    (state: RootState) => state.project,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
    }
  }, [id, dispatch]);

  if (status === 'loading') return <Spin size='large' />;
  if (status === 'failed')
    return <Alert message='Error' description={error} type='error' />;
  if (!project) return <p>Project not found</p>;

  return (
    <Card title={project.title} style={{ marginTop: '16px' }}>
      <img alt={project.title} src={project.cover} style={{ width: '100%' }} />
      <p>{project.description}</p>
    </Card>
  );
}
