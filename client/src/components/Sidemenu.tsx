import { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { navigation } from '../data/navigation-config';
import { useNavigate, useLocation } from 'react-router-dom';

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
