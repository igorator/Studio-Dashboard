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
      style={{ padding: '16px 14px', marginLeft: 12, marginBottom: 16 }}
    >
      {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </Button>
  );
}
