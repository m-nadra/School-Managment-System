import { 
    Flex 
} from "@chakra-ui/react"
import Nav from "@/components/Nav";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
    return (
        <Flex height="100vh">
            <Nav />
            <Outlet />
        </Flex>
    );
}