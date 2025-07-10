import {
    Flex,
    Heading,
    ClientOnly,
    IconButton,
    Skeleton,
    Button,
    Image,
    Box
} from "@chakra-ui/react";
import { 
    LuMoon, 
    LuSun,
    LuLogIn,
} from "react-icons/lu";
import classroomImage from "../assets/img/classroom.jpg";
import { useColorMode } from "../components/ui/color-mode"
import { useNavigate } from "react-router";

export default function Main() {
    const { toggleColorMode, colorMode } = useColorMode()
    const navigate = useNavigate();
    return (
        <Flex display="flex" flexDirection="row" alignItems="center" justifyContent="center" height="100vh"
            width="100%" bgColor={colorMode === "light" ? "white" : "gray.800"} position="relative" spaceY={2}>
            <Box width="40%" spaceX='2' height="100%" alignItems="center" justifyContent="center" display="flex" flexDirection="column" gap="5">
                <Heading size="7xl">School Managment System</Heading>
                <Box flexDirection="row" display="flex" flexWrap="wrap" justifyContent="flex-start" width="100%">
                    <Button size="lg" onClick={() => navigate("/login")}>
                        Login to system <LuLogIn />
                    </Button>
                    <ClientOnly fallback={<Skeleton boxSize="8" />}>
                        <IconButton onClick={toggleColorMode} variant="ghost" size="lg">
                            {colorMode === "light" ? <LuSun /> : <LuMoon />}
                        </IconButton>
                    </ClientOnly>
                </Box>
            </Box>
            <Box width="50%" alignItems="center" justifyContent="center" display="flex">
                <Image src={classroomImage} alt="Classroom" width="100%" height="100%" objectFit="cover" rounded="2xl" />
            </Box>
        </Flex>
    );
}