import { 
    Button, 
    CloseButton, 
    Dialog, 
    Portal,
    IconButton,
    Field,
    Flex,
    Input,
    Box,
    defineStyle
} from "@chakra-ui/react"
import { toaster } from "../ui/toaster";
import { useState } from "react";
import { LuUserRoundPlus } from "react-icons/lu";

const apiUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function AddTeacherButton({reloadState}: {reloadState : React.Dispatch<React.SetStateAction<boolean>>}) {
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const handleAdding = async () => {
        await fetch(`${apiUrl}/teacher/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstname: firstName,
                secondname: secondName,
                lastname: lastName,
                email: email,
            }),
        }).then(() => {
            reloadState(true)
            toaster.create({
                description: "Teacher added successfully",
                type: "success",
            })
        })
        .catch(error => console.error("Error adding teacher:", error))
    }
    return (
        <Dialog.Root>
        <Dialog.Trigger asChild>
            <IconButton padding="0.5rem">
                <LuUserRoundPlus/> Add teacher
            </IconButton>
        </Dialog.Trigger>
        <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
            <Dialog.Content>
                <Dialog.Header>
                <Dialog.Title>Add teacher</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <Flex direction="column" gap={4}>
                        <Field.Root>
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
                        <Field.Root>
                            <Box pos="relative" w="full">
                                <Input onChange={e => setLastName(e.target.value)} className="peer" placeholder="" />
                                <Field.Label css={floatingStyles}>Last name</Field.Label>
                            </Box>
                        </Field.Root>
                        <Field.Root>
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
                    <Dialog.ActionTrigger asChild>
                        <Button onClick={handleAdding}>Add</Button>
                    </Dialog.ActionTrigger>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
                </Dialog.CloseTrigger>
            </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
        </Dialog.Root>
    )
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