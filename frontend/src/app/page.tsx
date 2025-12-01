"use client";

import {
	Box,
	Button,
	ClientOnly,
	Flex,
	Heading,
	Skeleton,
} from "@chakra-ui/react";
import { LuLogIn } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import { ColorModeButton } from "components/ui/color-mode"

export default function Main() {
	return (
		<Flex
			display="flex"
			flexDirection="row"
			alignItems="center"
			justifyContent="center"
			height="100vh"
			width="100%"
			position="relative"
			spaceY={2}
		>
			<Box
				width="40%"
				spaceX="2"
				height="100%"
				alignItems="center"
				justifyContent="center"
				display="flex"
				flexDirection="column"
				gap="5"
			>
				<Heading size="7xl">School Managment System</Heading>
				<Box
					flexDirection="row"
					display="flex"
					flexWrap="wrap"
					justifyContent="flex-start"
					width="100%"
				>
					<Link href="/login">
						<Button size="lg">
							Login to system <LuLogIn />
						</Button>
					</Link>
					<ClientOnly fallback={<Skeleton boxSize="8" />}>
						<ColorModeButton/>
					</ClientOnly>
				</Box>
			</Box>
			<Box
				width="50%"
				alignItems="center"
				justifyContent="center"
				display="flex"
			>
				<Image src="/classroom.jpg" alt="lassroom" width={500} height={500} />
			</Box>
		</Flex>
	);
}