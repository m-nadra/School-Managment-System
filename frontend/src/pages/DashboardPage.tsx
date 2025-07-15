import { Flex, IconButton, Text, For, Separator } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useColorMode, useColorModeValue } from "../components/ui/color-mode";
import { LuMoon, LuSun, LuLogOut, LuArrowLeftToLine, LuArrowRightFromLine } from "react-icons/lu";
import { GiTeacher } from "react-icons/gi";
import { FaHome, FaUserCircle, FaUserGraduate } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { GrUserSettings } from "react-icons/gr";
import { Outlet } from "react-router";

const apiUrl = import.meta.env.BACKEND_URL || "http://localhost:5000";


export default function Dashboard() {
    const {colorMode, toggleColorMode} = useColorMode();
    const [user, setUser] = useState("");
    const [role, setRole] = useState("");
    const [toggledNavbar, setToggledNavbar] = useState(false);
    const navigate = useNavigate();
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
            <Flex bg={useColorModeValue("gray.100", "gray.900")} flexDirection="column" gap="1" justify="start" w={toggledNavbar ? "5%" : "15%"} textAlign={"center"}>
                <Flex flexDir={toggledNavbar ? "column" : "row"} justify="space-around">
                    <IconButton onClick={toggleColorMode} variant="ghost" size="md">
                        {colorMode === "light" ? <LuSun /> : <LuMoon />}
                    </IconButton>
                    <IconButton onClick={() => setToggledNavbar(!toggledNavbar)} variant="ghost" size="md" order={toggledNavbar ? -1 : 0}>
                        {toggledNavbar ? <LuArrowRightFromLine />: <LuArrowLeftToLine/>}
                    </IconButton>
                </Flex>
                <Separator size="md" />
                <Flex flexDirection="column" gap="1">
                    <For each={[
                        { icon: <FaHome />, text: "Dashboard", path: "" },
                        { icon: <FaUserGraduate />, text: "Students", path: "students" },
                        { icon: <SiGoogleclassroom />, text: "Classes", path: "classes" },
                        { icon: <GiTeacher />, text: "Teachers", path: "teachers" },
                        { icon: <GrUserSettings />, text: "User Management", path: "users" },
                        { icon: <FaUserCircle />, text: "My Profile", path: "profile" }
                    ]}>
                        {(item) => (
                            <Link to={item.path}>
                                {!toggledNavbar ? (
                                <Flex p="2" gap="2" align="center">
                                    {item.icon}
                                    <Text fontSize="lg">{item.text}</Text>
                                </Flex>
                                ) : (
                                <IconButton variant="ghost" size="lg" aria-label={item.text}>
                                    {item.icon}
                                </IconButton>
                                )}
                            </Link>
                        )}
                    </For>
                </Flex>
                <Flex justifySelf="end" mt="auto"
                justify={ toggledNavbar ? "center" : "space-between"} p="3">
                    {!toggledNavbar &&
                    <Flex flexDirection="column">
                        <Text fontSize="md" fontWeight="bold">{user.toUpperCase()}</Text>
                        <Text fontSize="sm">{`Role: ${role.toUpperCase()}`}</Text>
                    </Flex>
                    }
                    <IconButton size="sm" onClick={Logout}>
                        <LuLogOut />
                    </IconButton>
                </Flex>
            </Flex>
            <Outlet />
        </Flex>
    );
}