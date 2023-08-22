import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/dbConn.js"
import { credentials } from "./middleware/credentials.js";
import { corsOptions } from "./config/corsOptions.js";

import { register } from "./controllers/auth.js";
import propertyRoute from "./routes/properties.js";
import contactRoute from "./routes/contact.js";
import authRoute from "./routes/auth.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 6001;

// Connect to mongoDB
connectDB()

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser())
app.use("/assets", express.static(path.join(__dirname, "public/assets")))


// Routes
app.post("/api/auth/register", register);
app.use("/api/auth", authRoute);
app.use("/api/properties", propertyRoute);
app.use("/api/contact", contactRoute);


mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server connected to PORT - ${PORT}`))
})

