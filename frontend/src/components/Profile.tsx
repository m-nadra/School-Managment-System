import {
    Flex,
    Text,
    Heading,
    Button
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ChangePassword from "@/components/ChangePassword";

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
        <Flex justifyContent="space-around" align="center" w="85%">
            <Flex direction="column" alignItems="center" gap={4} h="100vh" w="50%" justify="center">
                <Heading>Account</Heading>
                <Text>Username: {user?.account_data.username}</Text>
                <Text>Role: {user?.account_data.role}</Text>
                <ChangePassword/>
            </Flex>
            <Flex direction="column" alignItems="center" gap={4} w="50%" h="100vh" justify="center">
                <Heading>Personal data</Heading>
                <Text>Firstname: {user?.personal_data ? user.personal_data.firstname : ""}</Text>
                <Text>Secondname: {user?.personal_data ? user.personal_data.secondname : ""}</Text>
                <Text>Lastname: {user?.personal_data ? user.personal_data.lastname : ""}</Text>
                <Text>Email: {user?.personal_data ? user.personal_data.email : ""}</Text>
                <Button>Edit data</Button>
            </Flex>
        </Flex>
    );
}