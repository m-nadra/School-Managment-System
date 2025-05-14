import {
    Flex
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

type Profile = {
    account_data: AccountData;
    personal_data: PersonalData | null;
}

type AccountData = {
    id: number;
    username: string;
    role: string; 
}   

type PersonalData = {
    id: number;
    firstname: string;
    secondname: string | null;
    lastname: string;
    email: string;
}

export default function Profile() {
    const [user, setUser] = useState<Profile>();
    const apiUrl = import.meta.env.BACKEND_URL || "http://localhost:5000";
    useEffect(() => {
        fetch(`${apiUrl}/me`, {
            method: "GET",
            credentials: "include",
        })
        .then((response) => response.json())
        .then((data) => setUser(data))
    }, []);

    return (
        <Flex>
            {`${user?.account_data.username} ${user?.account_data.role}` }
            {user?.personal_data ? `${user.personal_data.firstname} ${user.personal_data.lastname} ${user.personal_data.email}` : ""}
        </Flex>
    );
}