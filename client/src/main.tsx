import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from './components/Theme/ThemeProvider';
import ErrorPage from './error-page';
import {
  Root,
  Projects,
  Offers,
  Team,
  Login,
  Leads,
  Dashboard,
  ProjectDetails,
  ProjectCreate,
  ProjectsReorder,
  OfferCreate,
  OffersReorder,
  OfferDetails,
  TeamMemberCreate,
  TeamMembersReorder,
  LeadDetails,
  TeamMemberDetails,
} from './routes/routes';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { routes } from './data/routes-config';

export const router = createBrowserRouter([
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
            element: <ProjectDetails />,
          },
          {
            path: 'create',
            element: <ProjectCreate />,
          },
          {
            path: 'reorder',
            element: <ProjectsReorder />,
          },
        ],
      },
      {
        path: routes.offers.path,
        element: <Offers />,
        children: [
          {
            path: 'create',
            element: <OfferCreate />,
          },
          {
            path: 'reorder',
            element: <OffersReorder />,
          },
          {
            path: ':id',
            element: <OfferDetails />,
          },
        ],
      },
      {
        path: routes.team.path,
        element: <Team />,
        children: [
          {
            path: 'create',
            element: <TeamMemberCreate />,
          },
          {
            path: 'reorder',
            element: <TeamMembersReorder />,
          },
          {
            path: ':id',
            element: <TeamMemberDetails />,
          },
        ],
      },
      {
        path: routes.leads.path,
        element: <Leads />,
        children: [
          {
            path: ':id',
            element: <LeadDetails />,
          },
        ],
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
