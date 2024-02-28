import Contact, { ContactAttributes } from "../models/contactModel";

const getUserContacts = async (userId: number): Promise<Contact[]> => {
	try {
		return await Contact.findAll({
			where: { UserId: userId },
		});
	} catch (error) {
		throw new Error("Failed to get user contacts");
	}
};

const getContactById = async (contactId: string) => {
	try {
		const contact = await Contact.findByPk(contactId);
		return contact;
	} catch (error) {
		throw new Error("Failed to fetch contact");
	}
};

const createContact = async (
	userId: number,
	fullName: string,
	phoneNumber: string,
	email?: string,
	image?: string
): Promise<Contact> => {
	try {
		return await Contact.create({
			fullName,
			phoneNumber,
			email,
			image,
			UserId: userId,
		} as ContactAttributes);
	} catch (error) {
		throw new Error("Failed to create contact");
	}
};

const updateContact = async (
	contactId: string,
	fullName: string,
	phoneNumber: string,
	email?: string,
	image?: string
): Promise<Contact | null> => {
	try {
		const contact = await Contact.findByPk(contactId);

		await contact!.update({ fullName, phoneNumber, email, image });
		return contact;
	} catch (error) {
		throw new Error("Failed to update contact");
	}
};

const deleteContact = async (contactId: string): Promise<void> => {
	try {
		const contact = await Contact.findByPk(contactId);

		await contact!.destroy();
	} catch (error) {
		throw new Error("Failed to delete contact");
	}
};

export {
	createContact,
	deleteContact,
	getUserContacts,
	getContactById,
	updateContact,
};
