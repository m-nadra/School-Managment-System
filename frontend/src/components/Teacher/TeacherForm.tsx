import { Teacher } from "@/types/Teacher.types";
import { Box, Field, Input, defineStyle } from "@chakra-ui/react";

const floatingStyles = defineStyle({
	pos: "absolute",
	bg: "bg",
	px: "0.5",
	top: "-3",
	insetStart: "2",
	fontWeight: "normal",
	pointerEvents: "none",
	transition: "position",
	_peerPlaceholderShown: {
		color: "fg.muted",
		top: "2.5",
		insetStart: "3",
	},
	_peerFocusVisible: {
		color: "fg",
		top: "-3",
		insetStart: "2",
	},
});

export default function TeacherForm({ teacher }: { teacher?: Teacher }) {
	return (
		<>
			{teacher && <Input name="id" defaultValue={teacher.id} hidden />}
			<Field.Root required>
				<Box pos="relative" w="full">
					<Input name="firstname" defaultValue={teacher?.firstname} className="peer" placeholder="" />
					<Field.Label css={floatingStyles}>First name</Field.Label>
				</Box>
			</Field.Root>
			<Field.Root>
				<Box pos="relative" w="full">
					<Input name="secondname" defaultValue={teacher?.secondname} className="peer" placeholder="" />
					<Field.Label css={floatingStyles}>Second name</Field.Label>
				</Box>
			</Field.Root>
			<Field.Root required>
				<Box pos="relative" w="full">
					<Input name="lastname" defaultValue={teacher?.lastname} className="peer" placeholder="" />
					<Field.Label css={floatingStyles}>Last name</Field.Label>
				</Box>
			</Field.Root>
			<Field.Root required>
				<Box pos="relative" w="full">
					<Input name="email" defaultValue={teacher?.email} className="peer" placeholder="" />
					<Field.Label css={floatingStyles}>Email</Field.Label>
				</Box>
			</Field.Root>
		</>
	);
}
