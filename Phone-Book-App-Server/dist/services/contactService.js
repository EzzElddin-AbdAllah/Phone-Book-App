"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContact = exports.getContactById = exports.getUserContacts = exports.deleteContact = exports.createContact = void 0;
const contactModel_1 = __importDefault(require("../models/contactModel"));
const getUserContacts = async (userId) => {
    try {
        return await contactModel_1.default.findAll({
            where: { UserId: userId },
        });
    }
    catch (error) {
        throw new Error("Failed to get user contacts");
    }
};
exports.getUserContacts = getUserContacts;
const getContactById = async (contactId) => {
    try {
        const contact = await contactModel_1.default.findByPk(contactId);
        return contact;
    }
    catch (error) {
        throw new Error("Failed to fetch contact");
    }
};
exports.getContactById = getContactById;
const createContact = async (userId, fullName, phoneNumber, email, image) => {
    try {
        return await contactModel_1.default.create({
            fullName,
            phoneNumber,
            email,
            image,
            UserId: userId,
        });
    }
    catch (error) {
        throw new Error("Failed to create contact");
    }
};
exports.createContact = createContact;
const updateContact = async (contactId, fullName, phoneNumber, email, image) => {
    try {
        const contact = await contactModel_1.default.findByPk(contactId);
        await contact.update({ fullName, phoneNumber, email, image });
        return contact;
    }
    catch (error) {
        throw new Error("Failed to update contact");
    }
};
exports.updateContact = updateContact;
const deleteContact = async (contactId) => {
    try {
        const contact = await contactModel_1.default.findByPk(contactId);
        await contact.destroy();
    }
    catch (error) {
        throw new Error("Failed to delete contact");
    }
};
exports.deleteContact = deleteContact;
