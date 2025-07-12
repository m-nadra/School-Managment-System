import {
    Flex,
    Text,
    Heading,
    Button
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ChangePassword from "@/components/ChangePassword";


type User = {
    id: number;
    firstname: string;
    secondname: string | null;
    lastname: string;
    email: string;
    user_id: number;
}

export default function Profile() {
    const [user, setUser] = useState<User>();
    const apiUrl = import.meta.env.BACKEND_URL || "http://localhost:5000";
    const navigate = useNavigate();
    const username = sessionStorage.getItem("username");
    const role = sessionStorage.getItem("role");
    useEffect(() => {
        fetch(`${apiUrl}/me`, {
            method: "GET",
            credentials: "include",
        })
        .then(async response => {
            if (!response.ok) {
                navigate("/login");
                sessionStorage.clear();
            }
            setUser(await response.json());
        })
    }, []);

    return (
        <Flex w="100%" justifyContent="space-around" align="center">
            <Flex direction="column" alignItems="center" gap={4} h="100vh" w="50%" justify="center">
                <Heading>Account</Heading>
                <Text>Username: {username}</Text>
                <Text>Role: {role}</Text>
                <ChangePassword/>
            </Flex>
            {role === "teacher" && <>
                <Flex direction="column" alignItems="center" gap={4} w="50%" h="100vh" justify="center">
                    <Heading>Personal data</Heading>
                        <Text>Firstname: {user?.firstname}</Text>
                        <Text>Secondname: {user?.secondname}</Text>
                        <Text>Lastname: {user?.lastname}</Text>
                        <Text>Email: {user?.email}</Text>
                    <Button>Edit data</Button>
                </Flex>
            </>}
        </Flex>
    );
}