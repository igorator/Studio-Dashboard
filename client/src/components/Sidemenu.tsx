import { useState, useEffect } from 'react';
import {
  FundOutlined,
  FolderOutlined,
  SmileOutlined,
  TeamOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { routes } from '../data/routes-config';

type MenuItem = Required<MenuProps>['items'][number];

const navigation: MenuItem[] = [
  { label: 'Dashboard', key: routes.dashboard, icon: <FundOutlined /> },
  { label: 'Projects', key: routes.projects, icon: <FolderOutlined /> },
  { label: 'Team', key: routes.team, icon: <TeamOutlined /> },
  { label: 'Offers', key: routes.offers, icon: <SmileOutlined /> },
  { label: 'Leads', key: routes.leads, icon: <MailOutlined /> },
];

export function Sidemenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key) {
      navigate(key);
    }
  };

  return (
    <Menu
      style={{
        background: `var(--primary-background)`,
        border: 'none',
      }}
      selectedKeys={[selectedKey]}
      items={navigation}
      mode='inline'
      onClick={handleMenuClick}
    />
  );
}
