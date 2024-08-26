import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorPage from './error-page';
import { App } from 'antd';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import {
  Root,
  Projects,
  Offers,
  Team,
  Login,
  Leads,
  Dashboard,
  ProjectDetail,
} from './routes/routes';
import { routes } from './data/routes-config';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from './components/Theme/ThemeProvider';

const router = createBrowserRouter([
  {
    path: routes.root.path,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: routes.root.path,
        element: <Navigate to={routes.dashboard.path} replace />,
      },
      {
        path: routes.dashboard.path,
        element: <Dashboard />,
      },
      {
        path: routes.projects.path,
        element: <Projects />,
        children: [
          {
            path: ':id',
            element: <ProjectDetail />,
          },
        ],
      },
      {
        path: routes.offers.path,
        element: <Offers />,
      },
      {
        path: routes.team.path,
        element: <Team />,
      },
      {
        path: routes.leads.path,
        element: <Leads />,
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
      <ThemeProvider>
        <App>
          <RouterProvider router={router} />
        </App>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
