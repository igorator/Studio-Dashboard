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
} from './routes/routes';
import { routes } from './data/routes-config';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from './components/Theme/ThemeProvider';

const router = createBrowserRouter([
  {
    path: routes.root,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: routes.root,
        element: <Navigate to={routes.dashboard} replace />,
      },
      {
        path: routes.dashboard,
        element: <Dashboard />,
      },
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
      {
        path: routes.leads,
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
