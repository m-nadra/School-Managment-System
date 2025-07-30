import { createRoot } from 'react-dom/client'
import { Provider } from '@/components/ui/provider'
import { createBrowserRouter, RouterProvider, redirect } from "react-router";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";
import Main from "./pages/MainPage";
import Teachers from './pages/TeacherPage';
import Profile from './components/Profile';

const apiUrl = import.meta.env.BACKEND_URL || "http://localhost:5000";

const router = createBrowserRouter([
	{
		path: '/',
		Component: Main,
		errorElement: <p>404 Page not found</p>,
	},
	{
		path: '/login',
		Component: Login,
		action: async ({ request }) => {
			const formData = await request.formData();
			const username = formData.get("username");
			const password = formData.get("password");

			if (!username || !password) 
				return { error: "Username and password are required" };
			try {
				const response = await fetch(`${apiUrl}/token`, {
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ username, password }),
				});
				
				if (response.ok) 
					return redirect("/dashboard");
				else 
					return { error: (await response.json()).detail };
			} 
			catch (error) {
				return { error: "An unexpected error occurred" };
			}
		}
	},
	{
		path: '/dashboard',
		Component: Dashboard,
		loader: async () => {
			try {
				const response = await fetch(`${apiUrl}/logged_user`, {
					method: "GET",
					credentials: "include",
				});
				if (response.status === 401) {
					return redirect("/login");
				}
				if (!response.ok) {
					throw new Error("Failed to fetch user data");
				}
				return await response.json();
			}
			catch (error) {
				console.error("Error fetching user data:", error);
				throw new Response("Internal Server Error", { status: 500 });
			}
		},
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
		]
	}
]);

createRoot(document.getElementById('root')!).render(
	<Provider>
		<RouterProvider router={router} />
	</Provider>
)
