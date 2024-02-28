import { NextFunction, Response } from "express";
import User from "../models/userModel";
import { AuthenticatedRequest } from "./jwtToken";

const validateUserId = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.user?.id;

		if (!userId || typeof userId !== "number") {
			return res
				.status(400)
				.json({ error: "User ID not found or invalid in the request" });
		}

		const user = await User.findByPk(userId);

		if (!user) {
			return res.status(404).json({ error: "User not found in the database" });
		}

		next();
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export default validateUserId;
