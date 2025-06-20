import { Box, Button, Dialog, Flex, Input, Portal, Text, Field, defineStyle } from "@chakra-ui/react"
import { useState } from "react";
import { LuPen } from "react-icons/lu";

const BACKEND_URL = import.meta.env.BACKEND_URL || 'http://localhost:5000';

type Teacher = {
    id: number;
    firstname: string;
    secondname: string;
    lastname: string;
    email: string;
    user_id: number;
}

export default function EditTeacher(teacher: Teacher) {
    const [firstName, setFirstName] = useState(teacher.firstname);
    const [secondName, setSecondName] = useState(teacher.secondname);
    const [lastName, setLastName] = useState(teacher.lastname);
    const [email, setEmail] = useState(teacher.email);

    const handleEdit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetch(`${BACKEND_URL}/teacher/${teacher.id}`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify({
                firstname: firstName,
                secondname: secondName,
                lastname: lastName,
                email: email,
            }),
        })
        .catch(error => console.error('Error editing teacher', error))
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button variant="outline" size="sm" onClick={e => e.stopPropagation()}>
                    <LuPen /> <Text>Edit</Text>
                </Button>
            </Dialog.Trigger>
            <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
            <Dialog.Content>
                <form onSubmit={handleEdit}>
                <Dialog.CloseTrigger />
                <Dialog.Header>
                    <Dialog.Title>Edit Teacher</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <Flex direction="column" gap={4}>
                        <Field.Root required>
                            <Box pos="relative" w="full">
                                <Input onChange={e => setFirstName(e.target.value)} className="peer" placeholder="" />
                                <Field.Label css={floatingStyles}>First name</Field.Label>
                            </Box>
                        </Field.Root>
                        <Field.Root>
                            <Box pos="relative" w="full">
                                <Input onChange={e => setSecondName(e.target.value)} className="peer" placeholder="" />
                                <Field.Label css={floatingStyles}>Second name</Field.Label>
                            </Box>
                        </Field.Root>
                        <Field.Root required>
                            <Box pos="relative" w="full">
                                <Input onChange={e => setLastName(e.target.value)} className="peer" placeholder="" />
                                <Field.Label css={floatingStyles}>Last name</Field.Label>
                            </Box>
                        </Field.Root>
                        <Field.Root required>
                            <Box pos="relative" w="full">
                                <Input onChange={e => setEmail(e.target.value)} className="peer" placeholder="" />
                                <Field.Label css={floatingStyles}>Email</Field.Label>
                            </Box>
                        </Field.Root>
                    </Flex>
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button type="submit">Edit</Button>
                </Dialog.Footer>
                </form>
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