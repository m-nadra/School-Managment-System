import { Button, CloseButton, Dialog, Portal, IconButton, Flex } from "@chakra-ui/react";
import { LuUserRoundPlus } from "react-icons/lu";
import { Form } from "react-router";
import TeacherForm from "./TeacherForm";

export default function AddTeacherButton() {
	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<IconButton padding="0.5rem">
					<LuUserRoundPlus /> Add teacher
				</IconButton>
			</Dialog.Trigger>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Add teacher</Dialog.Title>
						</Dialog.Header>
						<Form method="post" action="add">
							<Dialog.Body>
								<Flex direction="column" gap={4}>
									<TeacherForm />
								</Flex>
							</Dialog.Body>
							<Dialog.Footer>
								<Dialog.ActionTrigger asChild>
									<Button variant="outline">Cancel</Button>
								</Dialog.ActionTrigger>
								<Dialog.ActionTrigger asChild>
									<Button type="submit">Add</Button>
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
