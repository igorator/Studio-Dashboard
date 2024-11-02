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
import { PrivateRoute } from './routes/PrivateRoute'; // Импортируйте ваш компонент PrivateRoute

// Определение маршрутов
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
        element: <PrivateRoute element={<Dashboard />} />, // Защищенный маршрут
      },
      {
        path: routes.projects.path,
        element: <PrivateRoute element={<Projects />} />, // Защищенный маршрут
        children: [
          {
            path: ':id',
            element: <PrivateRoute element={<ProjectDetails />} />, // Защищенный маршрут
          },
          {
            path: 'create',
            element: <PrivateRoute element={<ProjectCreate />} />, // Защищенный маршрут
          },
          {
            path: 'reorder',
            element: <PrivateRoute element={<ProjectsReorder />} />, // Защищенный маршрут
          },
        ],
      },
      {
        path: routes.offers.path,
        element: <PrivateRoute element={<Offers />} />, // Защищенный маршрут
        children: [
          {
            path: 'create',
            element: <PrivateRoute element={<OfferCreate />} />, // Защищенный маршрут
          },
          {
            path: 'reorder',
            element: <PrivateRoute element={<OffersReorder />} />, // Защищенный маршрут
          },
          {
            path: ':id',
            element: <PrivateRoute element={<OfferDetails />} />, // Защищенный маршрут
          },
        ],
      },
      {
        path: routes.team.path,
        element: <PrivateRoute element={<Team />} />, // Защищенный маршрут
        children: [
          {
            path: 'create',
            element: <PrivateRoute element={<TeamMemberCreate />} />, // Защищенный маршрут
          },
          {
            path: 'reorder',
            element: <PrivateRoute element={<TeamMembersReorder />} />, // Защищенный маршрут
          },
          {
            path: ':id',
            element: <PrivateRoute element={<TeamMemberDetails />} />, // Защищенный маршрут
          },
        ],
      },
      {
        path: routes.leads.path,
        element: <PrivateRoute element={<Leads />} />, // Защищенный маршрут
        children: [
          {
            path: ':id',
            element: <PrivateRoute element={<LeadDetails />} />, // Защищенный маршрут
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

// Рендеринг приложения
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
