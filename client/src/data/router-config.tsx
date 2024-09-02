import { createBrowserRouter, Navigate } from 'react-router-dom';
import ErrorPage from '../error-page';
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
  TeamMemberCreate,
  TeamMembersReorder,
  LeadDetails,
} from '../routes/routes';

import { routes } from './routes-config';

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
