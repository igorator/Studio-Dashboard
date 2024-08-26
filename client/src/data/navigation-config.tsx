import { routes } from '../data/routes-config';
import {
  FundOutlined,
  FolderOutlined,
  SmileOutlined,
  TeamOutlined,
  MailOutlined,
} from '@ant-design/icons';

import { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

export const navigation: MenuItem[] = [
  {
    label: routes.dashboard.title,
    key: routes.dashboard.path,
    icon: <FundOutlined />,
  },
  {
    label: routes.projects.title,
    key: routes.projects.path,
    icon: <FolderOutlined />,
  },
  { label: routes.team.title, key: routes.team.path, icon: <TeamOutlined /> },
  {
    label: routes.offers.title,
    key: routes.offers.path,
    icon: <SmileOutlined />,
  },
  { label: routes.leads.title, key: routes.leads.path, icon: <MailOutlined /> },
];
