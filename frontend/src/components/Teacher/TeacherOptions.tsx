import { ActionBar, Portal, CloseButton, Button, Text } from "@chakra-ui/react"
import DeleteTeacher from "./DeleteTeacher";
import EditTeacher from "./EditTeacher";
import { useState, useEffect } from "react";
import { LuPen, LuTrash2 } from "react-icons/lu";
import { Teacher } from "@/types/Teacher.types";


export default function TeacherOptions({teacher, isChecked}: {teacher: Teacher; isChecked: boolean}) {
    const [open, setOpen] = useState(isChecked);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    useEffect(() => {
        setOpen(isChecked);
    }, [isChecked]);

    return (<>
        <ActionBar.Root open={open} onOpenChange={e => setOpen(!!e.open)}>
            <Portal>
            <ActionBar.Positioner>
                <ActionBar.Content>
                <ActionBar.SelectionTrigger>
                    {teacher.firstname} {teacher.lastname}
                </ActionBar.SelectionTrigger>
                <ActionBar.Separator />
                    <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
                        <LuPen /> <Text>Edit</Text>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setDeleteOpen(true)}>
                        <LuTrash2 /> <Text>Delete</Text>
                    </Button>
                <ActionBar.CloseTrigger asChild>
                    <CloseButton size="sm" />
                </ActionBar.CloseTrigger>
                </ActionBar.Content>
            </ActionBar.Positioner>
            </Portal>
        </ActionBar.Root>
        <EditTeacher teacher={teacher} open={editOpen} onOpenChange={setEditOpen}/>
        <DeleteTeacher teacherId={teacher.id} open={deleteOpen} onOpenChange={setDeleteOpen}/>
        </>
    )
}
