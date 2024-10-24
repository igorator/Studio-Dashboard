import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { Row, Col, Typography, Button, Space } from 'antd';
import {
  DeleteOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import {
  useCheckLeadByIdMutation,
  useDeleteLeadMutation,
} from '../../redux/services/leadApi';
import dayjs from 'dayjs';
import { WrapperCard } from '../../components/Cards/WrapperCard';
import { App } from 'antd';
import { routes } from '../../data/routes-config';
import { CustomModal } from '../../components/CustomModal';
import { Lead } from '../../data/types';
const { Title, Text } = Typography;

export function LeadDetails() {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { leads, refetch } = useOutletContext<{
    leads: Lead[];
    refetch: () => void;
  }>();

  const lead = leads.find((lead) => lead.id === Number(id));
  const [checkLead] = useCheckLeadByIdMutation();
  const [deleteLead] = useDeleteLeadMutation();

  console.log(leads);

  const handleCheckChange = async () => {
    if (!lead) return;
    try {
      await checkLead({ id: lead.id, is_checked: !lead.is_checked }).unwrap();
      message.success(`Lead ${lead.id} status updated successfully`);
      refetch();
    } catch (error) {
      console.error('Failed to update lead status', error);
    }
  };

  const handleDelete = async () => {
    if (!lead) return;
    try {
      await deleteLead(lead.id).unwrap();
      message.success('Lead deleted successfully');
      navigate(routes.leads.path);
      refetch(); // Обновление данных после удаления лида
    } catch (error) {
      message.error('Failed to delete lead');
    }
  };

  if (!lead) return <p>Lead not found</p>;

  return (
    <WrapperCard
      title={lead.full_name}
      controls={
        <Space>
          <Button
            type='link'
            icon={lead.is_checked ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            onClick={handleCheckChange}
          />
          <CustomModal
            title='Lead Deleting'
            message='Are you sure you want to delete this lead?'
            onOkAction={handleDelete}
            trigger={<DeleteOutlined />}
          />
        </Space>
      }
    >
      <Row>
        <Col span={16}>
          <Title level={5}>Email:</Title>
          <Text>
            <a href={`mailto:${lead.email}`}>{lead.email}</a>
          </Text>
        </Col>
        <Col span={16}>
          <Title level={5}>Phone Number:</Title>
          <Text>
            <a href={`tel:${lead.phone_number}`}>{lead.phone_number}</a>
          </Text>
        </Col>
        <Col span={16}>
          <Title level={5}>Company Name:</Title>
          <Text>{lead.company_name}</Text>
        </Col>
        <Col span={16}>
          <Title level={5}>Submit Date:</Title>
          <Text>{dayjs(lead.createdAt).format('DD-MM-YYYY HH:mm')}</Text>
        </Col>
        <Col span={16} style={{ width: '100%' }}>
          <Title level={5}>Project Info:</Title>
          <Text>{lead.project_info}</Text>
        </Col>
      </Row>
    </WrapperCard>
  );
}
