import { LuTrash2 } from 'react-icons/lu';
import { Dialog, Button, Portal, Text } from '@chakra-ui/react';

const BACKEND_URL = import.meta.env.BACKEND_URL || 'http://localhost:5000';

export default function DeleteTeacher({ teacherId }: { teacherId: number }) {
    const handleDelete = () => {
        fetch(`${BACKEND_URL}/teacher/${teacherId}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        .catch(error => {
            console.error('Error deleting teacher:', error);
        });
    }

    return ( 
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button variant="outline" size="sm" onClick={e => e.stopPropagation()}>
                    <LuTrash2 /> <Text>Delete</Text>
                </Button>
            </Dialog.Trigger>
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