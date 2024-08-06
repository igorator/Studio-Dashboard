import { useState, useEffect } from 'react';
import { FolderOutlined, SmileOutlined, TeamOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { routes } from '../data/routes-data';

type MenuItem = Required<MenuProps>['items'][number];

const navigation: MenuItem[] = [
  { label: 'Projects', key: routes.projects, icon: <FolderOutlined /> },
  { label: 'Offers', key: routes.offers, icon: <SmileOutlined /> },
  { label: 'Team', key: routes.team, icon: <TeamOutlined /> },
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
