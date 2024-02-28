"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contactModel_1 = __importDefault(require("../models/contactModel"));
const validateContactId = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await contactModel_1.default.findByPk(contactId);
    if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
    }
    next();
};
exports.default = validateContactId;
