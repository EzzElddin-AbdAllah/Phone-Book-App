"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contactModel_1 = __importDefault(require("../models/contactModel"));
const validateContactOwnership = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const userId = Number(req.user?.id);
        const contact = await contactModel_1.default.findByPk(contactId);
        if (contact.UserId !== userId) {
            return res.status(403).json({ error: "Permission denied" });
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = validateContactOwnership;
