import { Request, Response, NextFunction } from "express";

const validateContact = (req: Request, res: Response, next: NextFunction) => {
	const { fullName, phoneNumber, email, image } = req.body;

	if (!fullName || !phoneNumber) {
		return res
			.status(400)
			.json({ error: "Full Name and Phone Number are required" });
	}

	const phoneNumberRegex = /^\+?[0-9]+$/;
	if (!phoneNumberRegex.test(phoneNumber)) {
		return res.status(400).json({ error: "Invalid phone number format" });
	}

	if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return res.status(400).json({ error: "Invalid email format" });
	}

	if (typeof fullName !== "string" || fullName.trim() === "") {
		return res
			.status(400)
			.json({ error: "Full Name must be a non-empty string" });
	}

	if (image && !/^(ftp|http|https):\/\/[^ "]+$/.test(image)) {
		return res.status(400).json({ error: "Image must be a string (URL)" });
	}

	next();
};

export default validateContact;
