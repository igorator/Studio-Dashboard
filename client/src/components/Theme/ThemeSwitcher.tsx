import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import { toggleTheme } from '../../redux/slices/themeSlice';

export function ThemeSwitcher() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
      <SunOutlined />
      <Switch checked={darkMode} onChange={handleToggle} />
      <MoonOutlined />
    </div>
  );
}
