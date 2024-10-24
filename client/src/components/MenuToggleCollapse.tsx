import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { toggleCollapse } from '../redux/slices/menuCollapseSlice';

export function MenuToggleCollapse() {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((state) => state.collapse.collapsed);

  const handleToggle = () => {
    dispatch(toggleCollapse());
  };

  return (
    <Button
      type='primary'
      onClick={handleToggle}
      style={{ padding: '18px 20px', marginLeft: 14, marginBottom: 16 }}
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    />
  );
}
