"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtToken_1 = __importDefault(require("../middleware/jwtToken"));
const contactController_1 = require("../controllers/contactController");
const validateUserId_1 = __importDefault(require("../middleware/validateUserId"));
const validateContact_1 = __importDefault(require("../middleware/validateContact"));
const validateContactPatch_1 = __importDefault(require("../middleware/validateContactPatch"));
const validateContactId_1 = __importDefault(require("../middleware/validateContactId"));
const validateContactOwnership_1 = __importDefault(require("../middleware/validateContactOwnership"));
const router = express_1.default.Router();
router.get("/user", jwtToken_1.default, validateUserId_1.default, contactController_1.getUserContacts);
router.get("/:contactId", jwtToken_1.default, validateUserId_1.default, validateContactId_1.default, validateContactOwnership_1.default, contactController_1.getContactById);
router.post("/", jwtToken_1.default, validateUserId_1.default, validateContact_1.default, contactController_1.createContact);
router.patch("/:contactId", jwtToken_1.default, validateUserId_1.default, validateContactId_1.default, validateContactPatch_1.default, validateContactOwnership_1.default, contactController_1.updateContact);
router.delete("/:contactId", jwtToken_1.default, validateUserId_1.default, validateContactId_1.default, validateContactOwnership_1.default, contactController_1.deleteContact);
exports.default = router;
