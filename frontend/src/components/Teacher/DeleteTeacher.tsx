import { Dialog, Button, Portal, Text } from '@chakra-ui/react';
import { toaster } from '../ui/toaster';

const BACKEND_URL = import.meta.env.BACKEND_URL || 'http://localhost:5000';

export default function DeleteTeacher({ teacherId, open, onOpenChange, reloadState }: { teacherId: number, open: boolean, onOpenChange: (open: boolean) => void, reloadState: React.Dispatch<React.SetStateAction<boolean>> }) {
    const handleDelete = () => {
        fetch(`${BACKEND_URL}/teacher/${teacherId}`, {
            method: 'DELETE',
            credentials: 'include',
        }).then(() => {
            reloadState(true);
            toaster.create({
                description: "Teacher deleted successfully",
                type: "success",
            });
        })
        .catch(error => {
            console.error('Error deleting teacher:', error);
        });
    }

    return ( 
        <Dialog.Root open={open} onOpenChange={e => onOpenChange(!!e.open)}>
            <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
            <Dialog.Content>
                <Dialog.CloseTrigger />
                <Dialog.Header>
                    <Dialog.Title>Delete Teacher</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <Text>Are you sure you want to delete this teacher?</Text>
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button onClick={handleDelete}>Delete</Button>
                </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}