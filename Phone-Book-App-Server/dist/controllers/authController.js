"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const generateJWT = (userId, email) => {
    return jsonwebtoken_1.default.sign({ userId, email }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });
};
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }
    try {
        const user = await userModel_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = generateJWT(user.id, user.email);
        res.json({ email: user.email, token });
    }
    catch (error) {
        next(error);
    }
};
exports.loginUser = loginUser;
const registerUser = async (req, res, next) => {
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
        const existingUser = await userModel_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await userModel_1.default.create({
            email,
            password: hashedPassword,
            fullname,
            phone,
        });
        const token = generateJWT(newUser.id, newUser.email);
        res.json({ email: newUser.email, token });
    }
    catch (error) {
        next(error);
    }
};
exports.registerUser = registerUser;
