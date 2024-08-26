import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../data/routes-config';
import { HomeOutlined } from '@ant-design/icons';

const items = Object.values(routes);

function itemRender(currentRoute, params, items, paths) {
  const isLast = currentRoute?.path === items[items.length - 1]?.path;

  return isLast ? (
    <span>{currentRoute.title}</span>
  ) : (
    <Link to={`${paths.join('/')}`}>{currentRoute.title}</Link>
  );
}

export function Breadcrumbs() {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbItems = [
    { path: routes.root.path, title: <HomeOutlined /> },
    ...pathnames.map((_, index) => {
      const url = `/${pathnames.slice(0, index + 1).join('/')}`;
      const route = items.find(
        (route) =>
          route.path === url ||
          (route.path.endsWith(':id') &&
            url.startsWith(route.path.replace(':id', ''))),
      );

      return {
        title: route
          ? route.path.endsWith(':id')
            ? pathnames[index]
            : route.title
          : pathnames[index],
        path: url,
      };
    }),
  ];

  return <Breadcrumb itemRender={itemRender} items={breadcrumbItems} />;
}
