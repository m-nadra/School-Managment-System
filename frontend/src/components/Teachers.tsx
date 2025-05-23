import { 
    Table,
    Flex 
} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Teacher = {
    id: number;
    firstname: string;
    secondname: string;
    lastname: string;
    email: string;
    user_id: number;
}

export default function Teachers() {
    const [teachers, setTeachers] = useState<Array<Teacher>>([]);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.BACKEND_URL || "http://localhost:5000";

    useEffect(() => {
        fetch(`${apiUrl}/teacher/`, {
            method: "GET",
            credentials: "include"
        })
        .then(async response => {
            if (!response.ok) {
                navigate("/login");
                sessionStorage.clear();
            }
            setTeachers(await response.json());
        })
    }, []);

    return (
        <Flex width="85%" height="100vh">
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>First Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Second Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Last Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Email</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {teachers.map((teacher) => (
                        <Table.Row key={teacher.id}>
                            <Table.Cell>{teacher.firstname}</Table.Cell>
                            <Table.Cell>{teacher.secondname}</Table.Cell>
                            <Table.Cell>{teacher.lastname}</Table.Cell>
                            <Table.Cell>{teacher.email}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Flex>
    );
}