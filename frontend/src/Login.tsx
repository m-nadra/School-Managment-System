import { 
    Input,
    Flex,
    Heading,
    ClientOnly,
    IconButton,
    Skeleton,
    Button,
    InputGroup,
} from "@chakra-ui/react"
import { useColorMode, useColorModeValue } from "./components/ui/color-mode"
import { 
    LuMoon, 
    LuSun,
    LuUser,
    LuKey,
} from "react-icons/lu"
import { PasswordInput } from "@/components/ui/password-input"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();


        const apiUrl = import.meta.env.BACKEND_URL || "http://localhost:5000";
        const response = await fetch(`${apiUrl}/token`, {
            method: "POST",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
            username: username,
            password: password,
            }),
        });
    
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.access_token);
            navigate("/");
        } else {
            alert("Błąd logowania. Sprawdź dane.");
        }
    };

    const { toggleColorMode, colorMode } = useColorMode()
    return (
        <form onSubmit={handleLogin} method="POST">
            <Flex justifyContent='center' alignItems='center' flexDirection='column' h='100vh' textAlign='center' gap={4}>
                <Flex
                    flexDirection="column"
                    bg={useColorModeValue('gray.100', 'gray.900')}
                    p={12}
                    borderRadius={8}
                    boxShadow="lg"
                    spaceY={3}>
                        <Heading>Login to system</Heading>
                        <InputGroup startElement={<LuUser />}>
                        <Input placeholder="Username" size='lg' onChange={(e) => setUsername(e.target.value)} required/>
                        </InputGroup>
                        <InputGroup startElement={<LuKey />}>
                        <PasswordInput placeholder="Password" size='lg' onChange={(e) => setPassword(e.target.value)} required/>
                        </InputGroup>
                        <Button type="submit">Login</Button>
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

export default LoginForm