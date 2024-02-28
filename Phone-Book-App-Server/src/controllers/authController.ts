import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { UserCreationAttributes } from "../models/userModel";

interface AuthRequest extends Request {
	body: {
		email: string;
		password: string;
		fullname: string;
		phone: string;
	};
}

const generateJWT = (userId: number, email: string): string => {
	return jwt.sign({ userId, email }, process.env.JWT_SECRET!, {
		expiresIn: "3d",
	});
};

const loginUser = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: "Email and password are required" });
	}

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return res.status(400).json({ error: "Invalid email format" });
	}

	try {
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		const token = generateJWT(user.id, user.email);

		res.json({ email: user.email, token });
	} catch (error) {
		next(error);
	}
};

const registerUser = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	const { email, password, fullname, phone } = req.body;

	if (!email || !password || !fullname || !phone) {
		return res
			.status(400)
			.json({ error: "Email, password, fullname and phone are required" });
	}

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return res.status(400).json({ error: "Invalid email format" });
	}

	if (!/^\+?[0-9]+$/.test(phone)) {
		return res.status(400).json({ error: "Invalid phone number format" });
	}

	try {
		const existingUser = await User.findOne({ where: { email } });

		if (existingUser) {
			return res.status(400).json({ error: "Email is already registered" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			email,
			password: hashedPassword,
			fullname,
			phone,
		} as UserCreationAttributes);

		const token = generateJWT(newUser.id, newUser.email);

		res.json({ email: newUser.email, token });
	} catch (error) {
		next(error);
	}
};

export { loginUser, registerUser };
