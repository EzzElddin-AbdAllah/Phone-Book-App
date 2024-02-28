import express from "express";
import verifyToken from "../middleware/jwtToken";
import {
	createContact,
	deleteContact,
	getUserContacts,
	getContactById,
	updateContact,
} from "../controllers/contactController";

import validateUserId from "../middleware/validateUserId";
import validateContact from "../middleware/validateContact";
import validateContactPatch from "../middleware/validateContactPatch";
import validateContactId from "../middleware/validateContactId";
import validateContactOwnership from "../middleware/validateContactOwnership";

const router = express.Router();

router.get("/user", verifyToken, validateUserId, getUserContacts);

router.get(
	"/:contactId",
	verifyToken,
	validateUserId,
	validateContactId,
	validateContactOwnership,
	getContactById
);

router.post("/", verifyToken, validateUserId, validateContact, createContact);

router.patch(
	"/:contactId",
	verifyToken,
	validateUserId,
	validateContactId,
	validateContactPatch,
	validateContactOwnership,
	updateContact
);

router.delete(
	"/:contactId",
	verifyToken,
	validateUserId,
	validateContactId,
	validateContactOwnership,
	deleteContact
);

export default router;
