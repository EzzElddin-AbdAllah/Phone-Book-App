import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import { testConnection } from "./config/dbConnect";
import authRoutes from "./routes/authRoutes";
import contactRoutes from "./routes/contactRoutes";

dotenv.config();

const app = express();
const port = 8000;

testConnection();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
	console.log(`Received ${req.method} request at ${req.url}`);
	next();
});

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
