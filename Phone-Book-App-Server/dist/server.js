"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const dbConnect_1 = require("./config/dbConnect");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8000;
(0, dbConnect_1.testConnection)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(`Received ${req.method} request at ${req.url}`);
    next();
});
app.use("/api/auth", authRoutes_1.default);
app.use("/api/contacts", contactRoutes_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
