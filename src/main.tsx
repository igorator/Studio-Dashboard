import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root, Projects, Offers, Team, Login } from './routes/routes';
import ErrorPage from './error-page';
import { routes } from './data/routes-data';

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
    <RouterProvider router={router} />
  </React.StrictMode>,
);
