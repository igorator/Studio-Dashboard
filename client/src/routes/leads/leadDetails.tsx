import { useParams } from 'react-router-dom';
import { Card, Spin, Alert } from 'antd';
import { useGetLeadByIdQuery } from '../../redux/services/leadApi';

export function LeadDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: lead, error, isLoading } = useGetLeadByIdQuery(id!);

  if (isLoading) return <Spin size='large' />;
  if (error)
    return (
      <Alert message='Error' description='Failed to fetch lead' type='error' />
    );
  if (!lead) return <p>Lead not found</p>;

  return (
    <Card title={lead.title} style={{ height: '100%', marginTop: '20px' }}>
      <p>{lead.message}</p>
    </Card>
  );
}
