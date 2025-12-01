"use client"

import { Container } from "@chakra-ui/react"
import { useColorModeValue } from "components/ui/color-mode";
import { Provider } from "components/ui/provider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<Provider>
					<Container bg={useColorModeValue("gray.100", "gray.800")} w="100%" h="100%">
						{children}
					</Container>
				</Provider>
			</body>
		</html>
	);
}
