import { createRoot } from 'react-dom/client'
import { Provider } from '@/components/ui/provider'
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";
import Main from "./pages/MainPage";
import Teachers from './components/Teachers';
import Profile from './components/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Main,
    errorElement: <p>404 Page not found</p>,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/dashboard',
    Component: Dashboard,
    children: [
      {
        index: true,
        element: <p>Dashboard</p>,
      },
      {
        path: 'teachers',
        Component: Teachers,
      },
      {
        path: 'profile',
        Component: Profile,
      },
      {
        path: 'students',
        element: <p>Students</p>,
      },
      {
        path: 'classes',
        element: <p>Classes</p>,
      },
      {
        path: 'users',
        element: <p>User management</p>,
      }
  ]}
]);

createRoot(document.getElementById('root')!).render(
  <Provider>
    <RouterProvider router={router} />
  </Provider>
)
