import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../middleware/jwtToken";
import {
	createContact as createContactService,
	deleteContact as deleteContactService,
	getUserContacts as getUserContactsService,
	updateContact as updateContactService,
	getContactById as getContactByIdService,
} from "../services/contactService";

const getUserContacts = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = Number(req.user?.id);

		const contacts = await getUserContactsService(userId);
		res.json(contacts);
	} catch (error) {
		next(error);
	}
};

const getContactById = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const { contactId } = req.params;

		const contact = await getContactByIdService(contactId);

		res.json(contact);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const createContact = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { fullName, phoneNumber, email, image } = req.body;
		const userId = Number(req.user?.id);

		const newContact = await createContactService(
			userId,
			fullName,
			phoneNumber,
			email,
			image
		);
		res.json(newContact);
	} catch (error: any) {
		next(error);
	}
};

const updateContact = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	const { contactId } = req.params;
	const { fullName, phoneNumber, email, image } = req.body;

	try {
		const updatedContact = await updateContactService(
			contactId,
			fullName,
			phoneNumber,
			email,
			image
		);
		res.json(updatedContact);
	} catch (error: any) {
		next(error);
	}
};

const deleteContact = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	const { contactId } = req.params;

	try {
		await deleteContactService(contactId);
		res.json({ message: "Contact deleted successfully" });
	} catch (error: any) {
		next(error);
	}
};

export {
	createContact,
	deleteContact,
	getUserContacts,
	getContactById,
	updateContact,
};
