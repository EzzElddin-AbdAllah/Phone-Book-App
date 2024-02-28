import { NextFunction, Response } from "express";
import Contact from "../models/contactModel";
import { AuthenticatedRequest } from "./jwtToken";

const validateContactOwnership = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { contactId } = req.params;
		const userId = Number(req.user?.id);

		const contact = await Contact.findByPk(contactId);

		if (contact!.UserId !== userId) {
			return res.status(403).json({ error: "Permission denied" });
		}

		next();
	} catch (error) {
		next(error);
	}
};

export default validateContactOwnership;
