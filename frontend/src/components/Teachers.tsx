import { 
    Table,
    Flex,
    Input,
    InputGroup,
    Stat,
    Heading
} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    LuSearch, 
} from "react-icons/lu";
import AddTeacherButton from "./AddTeacher";
import TeacherOptions from "./TeacherOptions";


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
    const [teachersCount, setTeachersCount] = useState(0);
    const [checkedTeacher, setCheckedTeacher] = useState(0);
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
            const teachers = await response.json();
            setTeachers(teachers);
            setTeachersCount(teachers.length);
        })
    }, []);

    return (
        <Flex w="85%" direction="column" padding="1rem" gap="1rem" boxSizing="border-box">
            <Flex direction="row" justifyContent="space-between" align="center">
                <Heading size="2xl">Teachers</Heading>
                <Stat.Root display="flex" alignItems="flex-end">
                    <Stat.Label>Teachers in database</Stat.Label>
                    <Stat.ValueText>{teachersCount}</Stat.ValueText>
                </Stat.Root>
            </Flex>
            <Flex direction="row" justify="flex-end" align="center">
                <InputGroup flex="0 1 auto" startElement={<LuSearch />} width="auto">
                    <Input id="searchInput" placeholder="Search in teachers" onChange={searchInTable}/>
                </InputGroup>
                <AddTeacherButton />
            </Flex>
            <Flex>
            <Table.Root id="table" stickyHeader interactive variant="outline" rounded="md">
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
                        <Table.Row
                            key={teacher.id}
                            onClick={() => setCheckedTeacher(checkedTeacher === teacher.id ? 0 : teacher.id)}
                        >
                            <Table.Cell>{teacher.firstname}</Table.Cell>
                            <Table.Cell>{teacher.secondname}</Table.Cell>
                            <Table.Cell>{teacher.lastname}</Table.Cell>
                            <Table.Cell>{teacher.email}</Table.Cell>
                            <TeacherOptions teacher={teacher} isChecked={checkedTeacher === teacher.id} />
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            </Flex>
        </Flex>
    );
}

function searchInTable() {
    const input = document.getElementById("searchInput") as HTMLInputElement;
    const filter = input.value.toUpperCase();
    const table = document.getElementById("table") as HTMLTableElement;
    const tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
        const tds = tr[i].getElementsByTagName("td");
        let rowMatches = false;
        for (let j = 0; j < tds.length; j++) {
            const td = tds[j];
            if (td) {
                const txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    rowMatches = true;
                    break;
                }
            }
        }
        tr[i].style.display = rowMatches || tds.length === 0 ? "" : "none";
    }
}