import { useEffect, useState } from "react";

function HomePage() {
    const [user, setUser] = useState(null);
    const apiUrl = import.meta.env.BACKEND_URL || "http://localhost:5000";

    const fetchUser = async () => {
        const response = await fetch(`${apiUrl}/me`, {
            method: "GET",
            credentials: "include"
        });
        if (response.ok) {
            const data = await response.json();
            setUser(data.username);
        } else {
            const errorData = await response.json();
            setUser(errorData['detail'] || "Failed to fetch user");
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);

  return (<>
    <h1>Hello!</h1>
    <p>{user}</p>
  </>
  );
}
export default HomePage;