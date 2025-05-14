import { 
    Flex, 
    IconButton,
    Text, 

} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useColorMode, useColorModeValue } from "../components/ui/color-mode";
import { LuMoon, LuSun, LuLogOut } from "react-icons/lu";

type User = {
    username: string;
    role: string; 
}
export default function Nav() {
    const { colorMode, toggleColorMode } = useColorMode();
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.BACKEND_URL || "http://localhost:5000";
    const Logout = async () => {
        await fetch(`${apiUrl}/logout`, {
            method: "POST",
            credentials: "include"
        });
        navigate("/login");
    };

    useEffect(() => {
        fetch(`${apiUrl}/me`, {
            method: "GET",
            credentials: "include"
        })
        .then(async response => {
            if (response.ok) {
                const data = await response.json();
                setUser(data.account_data);
            }
            else {
                navigate("/login");
            } 
        })
    }, []);
    return (
        <Flex bg={useColorModeValue("gray.100", "gray.900")} width="15%" height="100vh" flexDirection="column" justifyContent="space-between">
            <IconButton onClick={toggleColorMode} variant="ghost" size="md">
                {colorMode === "light" ? <LuSun /> : <LuMoon />}
            </IconButton>
            <Flex alignSelf="flex-end" bg={useColorModeValue("gray.200", "gray.800")}
            w="100%" justify="space-between" p="3" borderRadius="lg" justifySelf="center" align="center">
                <Flex flexDirection="column">
                    <Text fontSize="md" fontWeight="bold">{user ? user.username.toUpperCase() : ""}</Text>
                    <Text fontSize="sm">{user ? `Role: ${user.role.toUpperCase()}` : ""}</Text>
                </Flex>
                <IconButton size="sm" onClick={Logout}>
                    <LuLogOut />
                </IconButton>
            </Flex>
        </Flex>
    );
}