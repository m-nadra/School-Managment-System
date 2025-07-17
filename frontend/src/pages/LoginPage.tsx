import { Input, Flex, Heading, ClientOnly, IconButton, Skeleton, Button, InputGroup, Text } from "@chakra-ui/react"
import { LuMoon, LuSun, LuUser, LuKey } from "react-icons/lu"
import { useColorMode, useColorModeValue } from "../components/ui/color-mode"
import { PasswordInput } from "@/components/ui/password-input"
import { Form, useActionData } from "react-router"

export default function Login() {
    const actionData = useActionData();
    const errorMessage = actionData?.error;
    const { toggleColorMode, colorMode } = useColorMode()

    return (
        <Form method="post">
            <Flex justifyContent='center' alignItems='center' flexDirection='column' h='100vh' textAlign='center' gap={4} bg={useColorModeValue('gray.100', 'gray.800')}>
                <Flex flexDirection="column" p={12} borderRadius={8} boxShadow="lg" spaceY={3}>
                    <Heading>Login to system</Heading>
                    <InputGroup startElement={<LuUser />}>
                        <Input name="username" placeholder="Username" size='lg' />
                    </InputGroup>
                    <InputGroup startElement={<LuKey />}>
                        <PasswordInput name="password" placeholder="Password" size='lg' />
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
        </Form>
    )
}