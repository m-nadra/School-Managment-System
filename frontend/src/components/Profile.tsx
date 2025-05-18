import {
    Flex,
    Text,
    Heading,
    Button,
    Dialog,
    Portal,
    CloseButton,
    Field
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PasswordInput } from "@/components/ui/password-input"

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
                {changePassword()}
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

const changePassword = () => {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button>Change password</Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.Header>
                    <Dialog.Title>Change password</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <Flex direction="column" gap={4}>
                            <Field.Root required>
                                <Field.Label>Old password <Field.RequiredIndicator/> </Field.Label>
                                <PasswordInput/>
                            </Field.Root>
                            <Field.Root required>
                                <Field.Label>New password <Field.RequiredIndicator/> </Field.Label>
                                <PasswordInput/>
                            </Field.Root>
                        </Flex>
                    </Dialog.Body>
                    <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                        <Button>Change</Button>
                    </Dialog.Footer>
                    <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}