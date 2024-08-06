import { useAppDispatch, useAppSelector } from '../redux/hooks/useMenuCollapse';
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
    <div
      style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}
    >
      <Button type='primary' onClick={handleToggle}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </div>
  );
}
