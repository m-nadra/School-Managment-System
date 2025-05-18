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

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

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
            alert("Password changed successfully");
        }
        else {
            const errorData = await response.json();
            alert(errorData['detail'] || "Password change failed");
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
                    </Flex>
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                        <Button type="submit">Change</Button>
                </Dialog.Footer>
                </form>
                <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                </Dialog.CloseTrigger>
            </Dialog.Content>
            </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}