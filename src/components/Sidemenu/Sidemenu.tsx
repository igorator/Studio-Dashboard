import { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { routes } from '../../data/routes-data';

const navigation = [
  { label: 'Projects', key: routes.projects },
  { label: 'Offers', key: routes.offers },
  { label: 'Team', key: routes.team },
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
      style={{ backgroundColor: 'transparent', border: 'none' }}
      mode='inline'
      selectedKeys={[selectedKey]}
      items={navigation}
      onClick={handleMenuClick}
    />
  );
}
