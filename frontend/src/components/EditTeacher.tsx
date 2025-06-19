import { Button, Dialog, Portal, Text } from "@chakra-ui/react"
import { LuPen } from "react-icons/lu";

const BACKEND_URL = import.meta.env.BACKEND_URL || 'http://localhost:5000';

export default function EditTeacher({teacherId} : {teacherId: number}) {
    const handleEdit = async () => {
        await fetch(`${BACKEND_URL}/teacher/${teacherId}`, {
            method: 'PUT',
            credentials: 'include',
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