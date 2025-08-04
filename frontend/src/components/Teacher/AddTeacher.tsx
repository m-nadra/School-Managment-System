import { Button, CloseButton, Dialog, Portal, IconButton, Field, Flex, Input, Box, defineStyle } from "@chakra-ui/react";
import { LuUserRoundPlus } from "react-icons/lu";
import { Form } from "react-router"

export default function AddTeacherButton() {
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
                <Form method="post" action="add">
                <Dialog.Body>
                    <Flex direction="column" gap={4}>
                        <Field.Root>
                            <Box pos="relative" w="full">
                                <Input name="firstname" className="peer" placeholder="" />
                                <Field.Label css={floatingStyles}>First name</Field.Label>
                            </Box>
                        </Field.Root>
                        <Field.Root>
                            <Box pos="relative" w="full">
                                <Input name="secondname" className="peer" placeholder="" />
                                <Field.Label css={floatingStyles}>Second name</Field.Label>
                            </Box>
                        </Field.Root>
                        <Field.Root>
                            <Box pos="relative" w="full">
                                <Input name="lastname" className="peer" placeholder="" />
                                <Field.Label css={floatingStyles}>Last name</Field.Label>
                            </Box>
                        </Field.Root>
                        <Field.Root>
                            <Box pos="relative" w="full">
                                <Input name="email" className="peer" placeholder="" />
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
                        <Button type="submit">Add</Button>
                    </Dialog.ActionTrigger>
                </Dialog.Footer>
                </Form>
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