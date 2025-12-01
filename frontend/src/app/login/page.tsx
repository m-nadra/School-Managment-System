"use client";

import {
	Input,
	Flex,
	Heading,
	ClientOnly,
	Skeleton,
	Button,
	InputGroup,
} from "@chakra-ui/react";
import { LuUser, LuKey } from "react-icons/lu";
import { PasswordInput } from "components/ui/password-input";
import { ColorModeButton } from "components/ui/color-mode"

export default function Login() {
	return (
		<form method="post">
			<Flex
				justifyContent="center"
				alignItems="center"
				flexDirection="column"
				h="100vh"
				textAlign="center"
				gap={4}
			>
				<Flex
					flexDirection="column"
					p={12}
					borderRadius={8}
					boxShadow="lg"
					spaceY={3}
				>
					<Heading>Login to system</Heading>
					<InputGroup startElement={<LuUser />}>
						<Input name="username" placeholder="Username" size="lg" />
					</InputGroup>
					<InputGroup startElement={<LuKey />}>
						<PasswordInput name="password" placeholder="Password" size="lg" />
					</InputGroup>
					<Button type="submit">Login</Button>
					{/* {errorMessage && <Text color="red">{errorMessage}</Text>} */}
				</Flex>
				<ClientOnly fallback={<Skeleton boxSize="8" />}>
					<ColorModeButton />
				</ClientOnly>
			</Flex>
		</form>
	);
}
