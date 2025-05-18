import {
    Button,
    CloseButton,
    Dialog,
    Field,
    Flex,
    Portal
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useState } from "react";
import { Alert } from "@chakra-ui/react"

type PasswordChangeProps = {
    status: string;
}

const PasswordChangeAlert = (props: PasswordChangeProps) => {
    if (props.status === "success") {
        return (
            <Alert.Root status="success" title="Password changed">
                <Alert.Indicator />
                <Alert.Title>Password changed successfully</Alert.Title>
            </Alert.Root>
        )
    } else if (props.status !== "") {
        return (
            <Alert.Root status="error" title="Password changed">
                <Alert.Indicator />
                <Alert.Title>{props.status}</Alert.Title>
            </Alert.Root>
        )
    }
    else return null;
    
}

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordChangeResponse, setPasswordChangeResponse] = useState("");

    const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const apiUrl = import.meta.env.BACKEND_URL || "http://localhost:5000";
        const response = await fetch(`${apiUrl}/user/change_password`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                old_password: oldPassword,
                new_password: newPassword,
            }),
        });
        if (response.ok) {
            setPasswordChangeResponse("success");
        }
        else {
            const data = await response.json();
            setPasswordChangeResponse(data.detail);
        }
    }

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
                <form onSubmit={handleChangePassword}>
                <Dialog.Body>
                    <Flex direction="column" gap={4}>
                        <Field.Root required>
                            <Field.Label>Old password<Field.RequiredIndicator/></Field.Label>
                            <PasswordInput onChange={(e) => setOldPassword(e.target.value)}/>
                        </Field.Root>
                        <Field.Root required>
                            <Field.Label>New password<Field.RequiredIndicator/></Field.Label>
                            <PasswordInput name="newPassword" onChange={(e) => setNewPassword(e.target.value)}/>
                        </Field.Root>
                        <PasswordChangeAlert status={passwordChangeResponse}/>
                    </Flex>
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                        <Button variant="outline" onClick={() => setPasswordChangeResponse("")}>Cancel</Button>
                    </Dialog.ActionTrigger>
                        <Button type="submit">Change</Button>
                </Dialog.Footer>
                </form>
                <Dialog.CloseTrigger asChild>
                    <CloseButton onClick={() => setPasswordChangeResponse("")} size="sm" />
                </Dialog.CloseTrigger>
            </Dialog.Content>
            </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}