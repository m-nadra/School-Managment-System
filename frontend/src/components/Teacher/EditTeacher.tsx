import { Button, Dialog, Flex, Portal, CloseButton } from "@chakra-ui/react";
import { Teacher } from "@/types/Teacher.types";
import { Form } from "react-router";
import TeacherForm from "./TeacherForm";

export default function EditTeacher({
	teacher,
	open,
	onOpenChange,
}: {
	teacher: Teacher;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	return (
		<Dialog.Root open={open} onOpenChange={(e) => onOpenChange(!!e.open)}>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.CloseTrigger />
						<Dialog.Header>
							<Dialog.Title>Edit Teacher</Dialog.Title>
						</Dialog.Header>
						<Form method="post" action="edit">
							<Dialog.Body>
								<Flex direction="column" gap={4}>
									<TeacherForm teacher={teacher} />
								</Flex>
							</Dialog.Body>
							<Dialog.Footer>
								<Dialog.ActionTrigger asChild>
									<Button variant="outline">Cancel</Button>
								</Dialog.ActionTrigger>
								<Dialog.ActionTrigger asChild>
									<Button type="submit">Edit</Button>
								</Dialog.ActionTrigger>
							</Dialog.Footer>
						</Form>
						<Dialog.CloseTrigger asChild>
							<CloseButton size="sm" />
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}
