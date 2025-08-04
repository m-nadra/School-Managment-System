import { createRoot } from 'react-dom/client'
import { Provider } from '@/components/ui/provider'
import { createBrowserRouter, RouterProvider, redirect } from "react-router";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";
import Main from "./pages/MainPage";
import Teachers from './pages/TeacherPage';
import Profile from './components/Profile';
import { toaster } from './components/ui/toaster';

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
		shouldRevalidate: () => false,
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
				loader: async () => {
					try {
						const response = await fetch(`${apiUrl}/teacher/`, {
							method: "GET",
							credentials: "include"
						});
						if (response.status === 401) {
							return redirect("/login");
						}
						if (!response.ok) {
							throw new Error("Failed to fetch teachers");
						}
						const teachers = await response.json();
						const teachersCount = teachers.length;
						return { teachers, teachersCount };
					} catch (error) {
						console.error("Error fetching teachers:", error);
						throw new Response("Internal Server Error", { status: 500 });
					}
				},
				children: [
					{
						path: 'add',
						action: async ({ request }) => {
							const formData = await request.formData();
							const firstname = formData.get("firstname");
							const secondname = formData.get("secondname");
							const lastname = formData.get("lastname");
							const email = formData.get("email");

							if (!firstname || !secondname || !lastname || !email) {
								return { error: "All fields are required" };
							}

							try {
								const response = await fetch(`${apiUrl}/teacher/`, {
									method: "POST",
									credentials: "include",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify({
										"firstname": firstname,
										"secondname": secondname,
										"lastname": lastname,
										"email": email,
									}),
								});
								
								if (response.ok) {
									toaster.create({
										description: "Teacher added successfully",
										type: "success",
									});
									return redirect("/dashboard/teachers");
								} else {
									return { error: (await response.json()).detail };
								}
							} catch (error) {
								console.error("Error adding teacher:", error);
								return { error: "An unexpected error occurred" };
							}
						}
					},
					{
						path: 'edit',
						action: async ({ request }) => {
							const formData = await request.formData();
							const id = formData.get("id");
							const firstname = formData.get("firstname");
							const secondname = formData.get("secondname");
							const lastname = formData.get("lastname");
							const email = formData.get("email");

							if (!id || !firstname || !secondname || !lastname || !email) {
								return { error: "All fields are required" };
							}

							try {
								const response = await fetch(`${apiUrl}/teacher/${id}`, {
									method: "PUT",
									credentials: "include",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify({
										"firstname": firstname,
										"secondname": secondname,
										"lastname": lastname,
										"email": email,
									}),
								});
								
								if (response.ok) {
									toaster.create({
										description: "Teacher edited successfully",
										type: "success",
									});
									return redirect("/dashboard/teachers");
								} else {
									return { error: (await response.json()).detail };
								}
							} catch (error) {
								console.error("Error editing teacher:", error);
								return { error: "An unexpected error occurred" };
							}
						}
					}
				]
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
