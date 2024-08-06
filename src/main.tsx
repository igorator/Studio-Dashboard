import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root, Projects, Offers, Team, Login } from './routes/routes';
import { ConfigProvider, theme } from 'antd';
import ErrorPage from './error-page';
import { routes } from './data/routes-data';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const router = createBrowserRouter([
  {
    path: routes.root,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: routes.projects,
        element: <Projects />,
      },
      {
        path: routes.offers,
        element: <Offers />,
      },
      {
        path: routes.team,
        element: <Team />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#b5af9e',
            colorInfo: '#b5af9e',
            fontSize: 16,
            sizeStep: 6,
            sizeUnit: 4,
            borderRadius: 8,
            fontFamily: 'Geist Mono Variable',
          },
          algorithm: theme.darkAlgorithm,
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
);
