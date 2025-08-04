import { Box, Button, Dialog, Flex, Input, Portal, CloseButton, Field, defineStyle } from "@chakra-ui/react"
import { Teacher } from "@/types/Teacher.types";
import { Form } from "react-router";

export default function EditTeacher({teacher, open, onOpenChange}: {teacher: Teacher, open: boolean, onOpenChange: (open: boolean) => void }) {
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
                <Form method="post" action="edit">
                <Dialog.Body>
                    <Flex direction="column" gap={4}>
                        <Input name="id" defaultValue={teacher.id} hidden />
                        <Field.Root required>
                            <Box pos="relative" w="full">
                                <Input name="firstname" defaultValue={teacher.firstname} />
                                <Field.Label css={floatingStyles}>First name</Field.Label>
                            </Box>
                        </Field.Root>
                        <Field.Root>
                            <Box pos="relative" w="full">
                                <Input name="secondname" defaultValue={teacher.secondname} />
                                <Field.Label css={floatingStyles}>Second name</Field.Label>
                            </Box>
                        </Field.Root>
                        <Field.Root required>
                            <Box pos="relative" w="full">
                                <Input name="lastname" defaultValue={teacher.lastname} />
                                <Field.Label css={floatingStyles}>Last name</Field.Label>
                            </Box>
                        </Field.Root>
                        <Field.Root required>
                            <Box pos="relative" w="full">
                                <Input name="email" defaultValue={teacher.email} />
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
                        <Button type="submit">Edit</Button>
                    </Dialog.ActionTrigger>
                </Dialog.Footer>
                </Form>
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