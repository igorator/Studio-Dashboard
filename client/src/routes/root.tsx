import { useAppSelector } from '../redux/hooks';
import { Layout } from 'antd';
import { Sidemenu } from '../components/Sidemenu';
import { Outlet } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { MenuToggleCollapse } from '../components/MenuToggleCollapse';
import { ThemeSwitcher } from '../components/Theme/ThemeSwitcher';
import '../index.css';

const { Header, Content, Footer, Sider } = Layout;

export default function Root() {
  const collapsed = useAppSelector((state) => state.collapse.collapsed);
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  return (
    <Layout
      className='primary-layout'
      style={{
        backgroundImage: `radial-gradient(${
          darkMode ? '#ffffff' : '#000000'
        } 1px, transparent 1px)`,
        backgroundSize: '27px 27px',
      }}
    >
      <Header className='header'>
        <Logo />
        <ThemeSwitcher />
      </Header>
      <Layout className='secondary-layout'>
        <Sider collapsed={collapsed} className='sider'>
          <MenuToggleCollapse />
          <Sidemenu />
        </Sider>
        <Content className='content'>
          <Outlet />
        </Content>
      </Layout>

      <Footer className='footer'>Studio</Footer>
    </Layout>
  );
}
