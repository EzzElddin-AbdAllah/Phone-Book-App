"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContact = exports.getContactById = exports.getUserContacts = exports.deleteContact = exports.createContact = void 0;
const contactService_1 = require("../services/contactService");
const getUserContacts = async (req, res, next) => {
    try {
        const userId = Number(req.user?.id);
        const contacts = await (0, contactService_1.getUserContacts)(userId);
        res.json(contacts);
    }
    catch (error) {
        next(error);
    }
};
exports.getUserContacts = getUserContacts;
const getContactById = async (req, res) => {
    try {
        const { contactId } = req.params;
        const contact = await (0, contactService_1.getContactById)(contactId);
        res.json(contact);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getContactById = getContactById;
const createContact = async (req, res, next) => {
    try {
        const { fullName, phoneNumber, email, image } = req.body;
        const userId = Number(req.user?.id);
        const newContact = await (0, contactService_1.createContact)(userId, fullName, phoneNumber, email, image);
        res.json(newContact);
    }
    catch (error) {
        next(error);
    }
};
exports.createContact = createContact;
const updateContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { fullName, phoneNumber, email, image } = req.body;
    try {
        const updatedContact = await (0, contactService_1.updateContact)(contactId, fullName, phoneNumber, email, image);
        res.json(updatedContact);
    }
    catch (error) {
        next(error);
    }
};
exports.updateContact = updateContact;
const deleteContact = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        await (0, contactService_1.deleteContact)(contactId);
        res.json({ message: "Contact deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteContact = deleteContact;
