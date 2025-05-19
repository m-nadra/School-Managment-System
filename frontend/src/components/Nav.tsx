import { 
    Flex, 
    IconButton,
    Text, 
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useColorMode, useColorModeValue } from "../components/ui/color-mode";
import { LuMoon, LuSun, LuLogOut } from "react-icons/lu";
import { GiTeacher } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

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
        <Flex bg={useColorModeValue("gray.100", "gray.900")} width="15%" height="100vh" flexDirection="column" gap="1" justify="start">
            <IconButton onClick={toggleColorMode} variant="ghost" size="md">
                {colorMode === "light" ? <LuSun /> : <LuMoon />}
            </IconButton>
            <Link to="profile">
                <Flex bg={useColorModeValue("gray.200", "gray.800")} p="2" gap="2" align="center" borderRadius="lg">
                    <CgProfile/><Text fontSize="lg">Profile</Text>
                </Flex>
            </Link>
            <Link to="teachers">
                <Flex bg={useColorModeValue("gray.200", "gray.800")} p="2" gap="2" align="center" borderRadius="lg">
                    <GiTeacher/><Text fontSize="lg">Teachers</Text>
                </Flex>
            </Link>
            <Flex justifySelf="end" bg={useColorModeValue("gray.200", "gray.800")} mt="auto"
            w="100%" justify="space-between" p="3" borderRadius="lg" align="center">
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