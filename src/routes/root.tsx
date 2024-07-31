import { Sidebar } from '../components/Sidebar/Sidebar';
import { Content } from '../components/Content/Content';
import { Outlet } from 'react-router-dom';

import { Header } from '../components/Header/Header';
import { Flex } from 'antd';

export default function Root() {
  return (
    <Flex vertical style={{ height: '100dvh' }}>
      <Header />
      <Flex style={{ height: '100%' }}>
        <Sidebar />
        <Content>
          <Outlet />
        </Content>
      </Flex>
    </Flex>
  );
}
