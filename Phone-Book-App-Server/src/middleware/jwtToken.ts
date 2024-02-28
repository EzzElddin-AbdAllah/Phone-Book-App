import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
	user?: {
		id: string;
		email: string;
	};
}

const verifyToken = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization?.replace("Bearer ", "");

	if (!token) {
		return res.status(401).json({ error: "Token is missing" });
	}

	try {
		const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");
		req.user = {
			id: decoded.userId,
			email: decoded.email,
		};
		next();
	} catch (error) {
		res.status(401).json({ error: "Invalid token" });
	}
};

export default verifyToken;
