import { Request, Response, NextFunction } from "express";
import Contact from "../models/contactModel";

const validateContactPatch = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { contactId } = req.params;
	const { fullName, phoneNumber, email, image } = req.body;

	const contact = await Contact.findByPk(contactId);

	if (!contact) {
		return res.status(404).json({ error: "Contact not found" });
	}

	if (!fullName && !phoneNumber && !email && !image) {
		return res
			.status(400)
			.json({ error: "At least one field is required for update" });
	}

	if (phoneNumber && !/^\+?[0-9]+$/.test(phoneNumber)) {
		return res.status(400).json({ error: "Invalid phone number format" });
	}

	if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return res.status(400).json({ error: "Invalid email format" });
	}

	if (fullName && (typeof fullName !== "string" || fullName.trim() === "")) {
		return res
			.status(400)
			.json({ error: "Full Name must be a non-empty string" });
	}

	if (image && !/^(ftp|http|https):\/\/[^ "]+$/.test(image)) {
		return res.status(400).json({ error: "Image must be a string (URL)" });
	}

	next();
};

export default validateContactPatch;
