import { useAppSelector } from '../redux/hooks/useMenuCollapse';
import { Layout } from 'antd';
import { Sidemenu } from '../components/Sidemenu';
import { Outlet } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { MenuToggleCollapse } from '../components/MenuToggleCollapse';

const { Header, Content, Footer, Sider } = Layout;

const layoutStyle = {
  overflow: 'hidden',
  width: '100%',
  height: '100dvh',
};

export default function Root() {
  const collapsed = useAppSelector((state) => state.collapse.collapsed);

  return (
    <Layout style={layoutStyle}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: `var(--primary-background)`,
          borderBottom: `var(--default-border)`,
          padding: '0 20px',
        }}
      >
        <Logo />
      </Header>
      <Layout>
        <Sider
          collapsed={collapsed}
          style={{
            backgroundColor: `var(--primary-background)`,
            borderRight: 'var(--default-border)',
            paddingTop: '24px',
          }}
        >
          <MenuToggleCollapse />
          <Sidemenu />
        </Sider>
        <Content
          style={{
            backgroundColor: 'black',
            backgroundImage: 'radial-gradient(#2D2D2D 1px, transparent 1px)',
            backgroundAttachment: 'fixed',
            backgroundSize: '26px 26px',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
      <Footer
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: `var(--default-border)`,
          padding: '24px 24px',
        }}
      ></Footer>
    </Layout>
  );
}
