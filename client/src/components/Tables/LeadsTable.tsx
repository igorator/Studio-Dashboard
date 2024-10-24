import { Table, Spin, Alert, Space, Button } from 'antd';
import {
  EditOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Lead } from '../../data/types';
import { CustomModal } from '../CustomModal';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../data/routes-config';
import {
  useCheckLeadByIdMutation,
  useDeleteLeadMutation,
} from '../../redux/services/leadApi';
import { App } from 'antd';

type LeadsTableProps = {
  leads: Lead[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

export const LeadsTable: React.FC<LeadsTableProps> = ({
  leads,
  isLoading,
  isError,
  refetch,
}) => {
  const navigate = useNavigate();
  const [checkLead] = useCheckLeadByIdMutation();
  const [deleteLead] = useDeleteLeadMutation();
  const { message } = App.useApp();

  if (isLoading) return <Spin />;
  if (isError)
    return (
      <Alert message='Error' description='Error loading leads' type='error' />
    );

  const handleCheckChange = async (lead: Lead) => {
    if (!lead) return;
    try {
      await checkLead({ id: lead.id, is_checked: !lead.is_checked }).unwrap();
      message.success(`Lead ${lead.id} status updated successfully`);
      refetch();
    } catch (error) {
      console.error('Failed to update lead status', error);
    }
  };

  const handleDelete = async (lead: Lead) => {
    if (!lead) return;
    try {
      await deleteLead(lead.id).unwrap();
      message.success(`Lead ${lead.id} deleted successfully`);
      refetch();
    } catch (error) {
      console.error('Failed to delete lead', error);
      message.error('Failed to delete lead');
    }
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      render: (text: string) => dayjs(text).format('DD-MM-YYYY HH:mm'),
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
    },
    {
      title: 'Company Name',
      dataIndex: 'company_name',
    },
    {
      title: 'Actions',
      render: (lead: Lead) => (
        <Space>
          <Button
            type='link'
            icon={<EditOutlined />}
            onClick={() => navigate(`${routes.leads.path}/${lead.id}`)}
          />
          <Button
            type='link'
            icon={lead.is_checked ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            onClick={() => handleCheckChange(lead)}
          />
          <CustomModal
            title='Lead Deleting'
            message='Are you sure you want to delete this lead?'
            onOkAction={() => handleDelete(lead)}
            trigger={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={leads}
      columns={columns}
      rowKey='id'
      pagination={false}
    />
  );
};
