import { Row, Col, Typography, Space, Flex, Button } from 'antd';
import { useGetProjectsQuery } from '../redux/services/projectApi';
import { useGetOffersQuery } from '../redux/services/offerApi';
import { useGetLeadsQuery } from '../redux/services/leadApi';
import { ProjectCard } from '../components/Cards/ProjectCard';
import { OfferCard } from '../components/Cards/OfferCard';
import { LeadsTable } from '../components/Tables/LeadsTable/LeadsTable';
import { WrapperCard } from '../components/Cards/WrapperCard';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { routes } from '../data/routes-config';

const { Text } = Typography;

export function Dashboard() {
  const { data: projects = [], refetch: refetchProjects } = useGetProjectsQuery(
    [],
  );
  const { data: offers = [], refetch: refetchOffers } = useGetOffersQuery([]);
  const { data: leads = [], refetch: refetchLeads } = useGetLeadsQuery([]);
  const navigate = useNavigate();
  const lastProject = projects[projects.length - 1];
  const lastOffer = offers[offers.length - 1];
  const lastLeads = leads.slice(-5);

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <WrapperCard
            title={'Projects'}
            controls={
              <Button
                icon={<EyeOutlined />}
                onClick={() => navigate(routes.projects.path)}
              />
            }
          >
            <Space direction='vertical' style={{ marginTop: '24px' }}>
              <Text>
                {projects.length}{' '}
                {projects.length === 1 ? 'Project' : 'Projects'}
              </Text>

              <Text>Last added:</Text>
              {lastProject ? (
                <ProjectCard onDelete={refetchProjects} project={lastProject} />
              ) : (
                <Text>No projects available</Text>
              )}
            </Space>
          </WrapperCard>
        </Col>

        <Col span={12}>
          <WrapperCard
            title={'Offers'}
            controls={
              <Button
                icon={<EyeOutlined />}
                onClick={() => navigate(routes.offers.path)}
              />
            }
          >
            <Space direction='vertical' style={{ marginTop: '24px' }}>
              <Text>
                {offers.length} {offers.length === 1 ? 'Offer' : 'Offers'}
              </Text>

              <Text>Last added:</Text>
              {lastOffer ? (
                <OfferCard onDelete={refetchOffers} offer={lastOffer} />
              ) : (
                <Text>No offers available</Text>
              )}
            </Space>
          </WrapperCard>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col span={24}>
          <WrapperCard
            title={'Leads'}
            controls={
              <Button
                icon={<EyeOutlined />}
                onClick={() => navigate(routes.leads.path)}
              />
            }
          >
            <Flex vertical>
              <Text>
                {leads.length} {leads.length === 1 ? 'Lead' : 'Leads'}
              </Text>
              <Space direction='vertical' style={{ marginTop: '24px' }}>
                <Text>Last added:</Text>
                {lastLeads.length > 0 ? (
                  <LeadsTable
                    leads={lastLeads}
                    isLoading={false}
                    isError={false}
                    refetch={refetchLeads} // Pass refetch here
                  />
                ) : (
                  <Text>No leads available</Text>
                )}
              </Space>
            </Flex>
          </WrapperCard>
        </Col>
      </Row>
    </>
  );
}
