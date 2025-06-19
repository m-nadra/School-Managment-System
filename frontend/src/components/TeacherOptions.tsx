import { ActionBar, Button, Portal, CloseButton } from "@chakra-ui/react"
import { LuPen } from "react-icons/lu"
import DeleteTeacher from "./DeleteTeacher";
import { useState, useEffect } from "react";

type TeacherOptionsProps = {
    teacher: Teacher;
    isChecked: boolean;
}

type Teacher = {
    id: number;
    firstname: string;
    secondname: string;
    lastname: string;
    email: string;
    user_id: number;
}


export default function TeacherOptions(props: TeacherOptionsProps) {
    const teacher = props.teacher;
    const [open, setOpen] = useState(props.isChecked);

    useEffect(() => {
        setOpen(props.isChecked);
    }, [props.isChecked]);

    return (
        <>
        <ActionBar.Root
            open={open}
            onOpenChange={(details: { open: boolean }) => setOpen(details.open)}
        >
            <Portal>
            <ActionBar.Positioner>
                <ActionBar.Content>
                <ActionBar.SelectionTrigger>
                    {teacher.firstname} {teacher.lastname}
                </ActionBar.SelectionTrigger>
                <ActionBar.Separator />
                <Button variant="outline" size="sm">
                    <LuPen />
                    Edit
                </Button>
                    <DeleteTeacher teacherId={teacher.id}/>
                <ActionBar.CloseTrigger asChild>
                    <CloseButton size="sm" />
                </ActionBar.CloseTrigger>
                </ActionBar.Content>
            </ActionBar.Positioner>
            </Portal>
        </ActionBar.Root>
        </>
    )
}
