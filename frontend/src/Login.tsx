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


function Login() {
    const { toggleColorMode, colorMode } = useColorMode()

    return (
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
                <Input placeholder="Username" size='lg'/>
                </InputGroup>
                <InputGroup startElement={<LuKey />}>
                <PasswordInput placeholder="Password" size='lg' />
                </InputGroup>
                <Button>Login</Button>
            </Flex>
            <ClientOnly fallback={<Skeleton boxSize="8" />}>
                <IconButton onClick={toggleColorMode} variant="ghost" size="md">
                    {colorMode === "light" ? <LuSun /> : <LuMoon />}
                </IconButton>
            </ClientOnly>
        </Flex>
    )
}

export default Login