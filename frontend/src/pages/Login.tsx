import { 
    Input,
    Flex,
    Heading,
    ClientOnly,
    IconButton,
    Skeleton,
    Button,
    InputGroup,
    Text,
} from "@chakra-ui/react"
import { 
    LuMoon, 
    LuSun,
    LuUser,
    LuKey,
} from "react-icons/lu"
import { useColorMode, useColorModeValue } from "../components/ui/color-mode"
import { PasswordInput } from "@/components/ui/password-input"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { toggleColorMode, colorMode } = useColorMode()
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const apiUrl = import.meta.env.BACKEND_URL || "http://localhost:5000";
        const response = await fetch(`${apiUrl}/token`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        });
        const responseData = await response.json();

        if (response.ok) {
            sessionStorage.setItem("username", responseData['username']);
            sessionStorage.setItem("role", responseData['role']);
            navigate("/dashboard");
        } else {
            setErrorMessage(responseData['detail'] || "Login failed");
        }
    };

    return (
        <form onSubmit={handleLogin} method="POST">
            <Flex justifyContent='center' alignItems='center' flexDirection='column' h='100vh' textAlign='center' gap={4} bg={useColorModeValue('gray.100', 'gray.800')}>
                <Flex flexDirection="column" p={12} borderRadius={8} boxShadow="lg" spaceY={3}>
                    <Heading>Login to system</Heading>
                    <InputGroup startElement={<LuUser />}>
                        <Input placeholder="Username" size='lg' onChange={(e) => setUsername(e.target.value)} required/>
                    </InputGroup>
                    <InputGroup startElement={<LuKey />}>
                        <PasswordInput placeholder="Password" size='lg' onChange={(e) => setPassword(e.target.value)} required/>
                    </InputGroup>
                    <Button type="submit">Login</Button>
                    {errorMessage && <Text color='red'>{errorMessage}</Text>}
                </Flex>
                <ClientOnly fallback={<Skeleton boxSize="8" />}>
                    <IconButton onClick={toggleColorMode} variant="ghost" size="md">
                        {colorMode === "light" ? <LuSun /> : <LuMoon />}
                    </IconButton>
                </ClientOnly>
            </Flex>
        </form>
    )
}