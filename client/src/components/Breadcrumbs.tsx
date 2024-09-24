import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../data/routes-config';
import { HomeOutlined } from '@ant-design/icons';
import { capitalize } from '../helpers/text/capitalize';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const breadcrumbItems = [
    {
      key: routes.root.path,
      title: (
        <Link to={routes.root.path}>
          <HomeOutlined />
        </Link>
      ),
    },
    ...pathnames.map((pathname, index) => {
      const url = `/${pathnames.slice(0, index + 1).join('/')}`;
      const route = Object.values(routes).find((route) => route.path === url);

      return {
        key: url,
        title: route ? (
          index === pathnames.length - 1 ? (
            <span>{capitalize(route.title)}</span>
          ) : (
            <Link to={url}>{capitalize(route.title)}</Link>
          )
        ) : (
          capitalize(pathname)
        ),
      };
    }),
  ];

  return <Breadcrumb items={breadcrumbItems} />;
};
