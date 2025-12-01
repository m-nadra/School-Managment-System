import { Dialog, Button, Portal, Text, Input } from "@chakra-ui/react";
import { Form } from "react-router";

export default function DeleteTeacher({
	teacherId,
	open,
	onOpenChange,
}: {
	teacherId: number;
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
							<Dialog.Title>Delete Teacher</Dialog.Title>
						</Dialog.Header>
						<Form method="post" action="delete">
							<Input name="id" defaultValue={teacherId} hidden />
							<Dialog.Body>
								<Text>Are you sure you want to delete this teacher?</Text>
							</Dialog.Body>
							<Dialog.Footer>
								<Dialog.ActionTrigger asChild>
									<Button variant="outline">Cancel</Button>
								</Dialog.ActionTrigger>
								<Button type="submit">Delete</Button>
							</Dialog.Footer>
						</Form>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}
