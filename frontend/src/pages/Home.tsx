import { useEffect, useState } from "react";

export default function Home() {
    const [user, setUser] = useState<string | null>(null);
    const apiUrl = import.meta.env.BACKEND_URL || "http://localhost:5000";

    useEffect(() => {
        fetch(`${apiUrl}/me`, {
            method: "GET",
            credentials: "include"
        })
        .then(async response => {
            const data = await response.json();
            if (response.ok) {
                setUser(`User: ${data.username}`);
            } else {
                setUser(`Error: ${data.detail}`);
            }
        })
    }, []);

    return (<>
        <h1>Hello!</h1>
        <p>{user}</p>
    </>);
}