import { Box, Button, Dialog, Flex, Input, Portal, CloseButton, Field, defineStyle } from "@chakra-ui/react"
import { useState } from "react";
import { toaster } from "../ui/toaster";
import { Teacher } from "@/types/Teacher.types";

const BACKEND_URL = import.meta.env.BACKEND_URL || 'http://localhost:5000';

export default function EditTeacher({teacher, open, onOpenChange, reloadState}: {teacher: Teacher, open: boolean, onOpenChange: (open: boolean) => void, reloadState: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [firstName, setFirstName] = useState(teacher.firstname);
    const [secondName, setSecondName] = useState(teacher.secondname);
    const [lastName, setLastName] = useState(teacher.lastname);
    const [email, setEmail] = useState(teacher.email);

    const handleEdit = async () => {
        await fetch(`${BACKEND_URL}/teacher/${teacher.id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: firstName,
                secondname: secondName,
                lastname: lastName,
                email: email,
            }),
        }).then(() => {
            reloadState(true);
            toaster.create({
                description: "Teacher edited successfully",
                type: "success",
            });
        })
        .catch(error => console.error('Error editing teacher', error))
    }

    return (
        <Dialog.Root open={open} onOpenChange={e => onOpenChange(!!e.open)}>
            <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
            <Dialog.Content>
                <Dialog.CloseTrigger />
                <Dialog.Header>
                    <Dialog.Title>Edit Teacher</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <Flex direction="column" gap={4}>
                        <Field.Root required>
                            <Box pos="relative" w="full">
                                <Input onChange={e => setFirstName(e.target.value)} value={firstName} />
                                <Field.Label css={floatingStyles}>First name</Field.Label>
                            </Box>
                        </Field.Root>
                        <Field.Root>
                            <Box pos="relative" w="full">
                                <Input onChange={e => setSecondName(e.target.value)} value={secondName} />
                                <Field.Label css={floatingStyles}>Second name</Field.Label>
                            </Box>
                        </Field.Root>
                        <Field.Root required>
                            <Box pos="relative" w="full">
                                <Input onChange={e => setLastName(e.target.value)} value={lastName} />
                                <Field.Label css={floatingStyles}>Last name</Field.Label>
                            </Box>
                        </Field.Root>
                        <Field.Root required>
                            <Box pos="relative" w="full">
                                <Input onChange={e => setEmail(e.target.value)} value={email} />
                                <Field.Label css={floatingStyles}>Email</Field.Label>
                            </Box>
                        </Field.Root>
                    </Flex>
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Dialog.ActionTrigger asChild>
                        <Button onClick={handleEdit}>Edit</Button>
                    </Dialog.ActionTrigger>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm"/>
                </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

const floatingStyles = defineStyle({
    pos: "absolute",
    bg: "bg",
    px: "0.5",
    top: "-3",
    insetStart: "2",
    fontWeight: "normal",
    pointerEvents: "none",
    transition: "position",
    _peerPlaceholderShown: {
        color: "fg.muted",
        top: "2.5",
        insetStart: "3",
    },
    _peerFocusVisible: {
        color: "fg",
        top: "-3",
        insetStart: "2",
    },
})