import { 
    Flex 
} from "@chakra-ui/react"
import Teachers from "@/components/Teachers";
import Nav from "@/components/Nav";

export default function Dashboard() {
    return (
        <Flex width="100%" height="100vh">
            <Nav />
            <Teachers />
        </Flex>
    );
}