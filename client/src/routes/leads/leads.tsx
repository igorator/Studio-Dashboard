import { Button } from 'antd';
import { useGetLeadsQuery } from '../../redux/services/leadApi';
import { WrapperCard } from '../../components/Cards/WrapperCard';
import { Outlet, useLocation } from 'react-router-dom';
import { routes } from '../../data/routes-config';
import { LeadsTable } from '../../components/Tables/LeadsTable';
import { ReloadOutlined } from '@ant-design/icons';

export function Leads() {
  const location = useLocation();
  const { data: leads, isLoading, isError, refetch } = useGetLeadsQuery([]);

  const isDetailsPage = location.pathname.includes(`${routes.leads.path}/`);

  if (isDetailsPage) return <Outlet context={{ leads, refetch }} />;

  return (
    <WrapperCard
      title='Leads'
      controls={
        <Button
          onClick={refetch}
          disabled={isLoading}
          icon={<ReloadOutlined />}
        />
      }
    >
      <LeadsTable
        leads={leads}
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
      />
    </WrapperCard>
  );
}
