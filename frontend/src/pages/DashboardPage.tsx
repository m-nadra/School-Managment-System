import { 
    Flex, 
    IconButton,
    Text, 
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useColorMode, useColorModeValue } from "../components/ui/color-mode";
import { LuMoon, LuSun, LuLogOut } from "react-icons/lu";
import { GiTeacher } from "react-icons/gi";
import { FaHome, FaUserCircle, FaUserGraduate } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { GrUserSettings } from "react-icons/gr";
import { Outlet } from "react-router";


export default function Dashboard() {
    const { colorMode, toggleColorMode } = useColorMode();
    const [user, setUser] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const apiUrl = import.meta.env.BACKEND_URL || "http://localhost:5000";
    const Logout = async () => {
        await fetch(`${apiUrl}/logout`, {
            method: "POST",
            credentials: "include"
        });
        navigate("/login");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("role");
    };

    useEffect(() => {
        const username = sessionStorage.getItem("username");
        const role = sessionStorage.getItem("role");
        if (!username || !role) {
            navigate("/login");
            sessionStorage.clear();
        }
        setUser(username || "");
        setRole(role || "");
    }, []);
    return (
        <Flex height="100vh" w="100%">
            <Flex bg={useColorModeValue("gray.100", "gray.900")} flexDirection="column" gap="1" justify="start" w="15%">
                <IconButton onClick={toggleColorMode} variant="ghost" size="md">
                    {colorMode === "light" ? <LuSun /> : <LuMoon />}
                </IconButton>
                <Link to="">
                    <Flex bg={useColorModeValue("gray.200", "gray.800")} p="2" gap="2" align="center" borderRadius="lg">
                        <FaHome/><Text fontSize="lg">Dashboard</Text>
                    </Flex>
                </Link>
                <Link to="students">
                    <Flex bg={useColorModeValue("gray.200", "gray.800")} p="2" gap="2" align="center" borderRadius="lg">
                        <FaUserGraduate/><Text fontSize="lg">Students</Text>
                    </Flex>
                </Link>
                <Link to="classes">
                    <Flex bg={useColorModeValue("gray.200", "gray.800")} p="2" gap="2" align="center" borderRadius="lg">
                        <SiGoogleclassroom/><Text fontSize="lg">Classes</Text>
                    </Flex>
                </Link>
                <Link to="teachers">
                    <Flex bg={useColorModeValue("gray.200", "gray.800")} p="2" gap="2" align="center" borderRadius="lg">
                        <GiTeacher/><Text fontSize="lg">Teachers</Text>
                    </Flex>
                </Link>
                <Link to="users">
                    <Flex bg={useColorModeValue("gray.200", "gray.800")} p="2" gap="2" align="center" borderRadius="lg">
                        <GrUserSettings/><Text fontSize="lg">User Managment</Text>
                    </Flex>
                </Link>
                <Link to="profile">
                    <Flex bg={useColorModeValue("gray.200", "gray.800")} p="2" gap="2" align="center" borderRadius="lg">
                        <FaUserCircle/><Text fontSize="lg">My profile</Text>
                    </Flex>
                </Link>
                <Flex justifySelf="end" bg={useColorModeValue("gray.200", "gray.800")} mt="auto"
                w="100%" justify="space-between" p="3" borderRadius="lg" align="center">
                    <Flex flexDirection="column">
                        <Text fontSize="md" fontWeight="bold">{user.toUpperCase()}</Text>
                        <Text fontSize="sm">{`Role: ${role.toUpperCase()}`}</Text>
                    </Flex>
                    <IconButton size="sm" onClick={Logout}>
                        <LuLogOut />
                    </IconButton>
                </Flex>
            </Flex>
            <Outlet />
        </Flex>
    );
}