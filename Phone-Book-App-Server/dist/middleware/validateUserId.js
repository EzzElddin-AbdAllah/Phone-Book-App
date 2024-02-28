"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const validateUserId = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId || typeof userId !== "number") {
            return res
                .status(400)
                .json({ error: "User ID not found or invalid in the request" });
        }
        const user = await userModel_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found in the database" });
        }
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.default = validateUserId;
