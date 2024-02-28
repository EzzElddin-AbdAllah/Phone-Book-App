import { Request, Response, NextFunction } from "express";
import Contact from "../models/contactModel";

const validateContactId = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { contactId } = req.params;

	const contact = await Contact.findByPk(contactId);

	if (!contact) {
		return res.status(404).json({ error: "Contact not found" });
	}

	next();
};

export default validateContactId;
