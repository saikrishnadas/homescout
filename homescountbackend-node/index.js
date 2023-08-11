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
import { connectDB } from "./config/dbConn.js"
import { credentials } from "./middleware/credentials.js";
import { corsOptions } from "./config/corsOptions.js";
import cookieParser from "cookie-parser";

import propertyRoute from "./routes/properties.js";
import { register } from "./controllers/auth.js";

dotenv.config();
app = express();
const PORT = process.env.PORT || 6001;

// Connect to mongoDB
connectDB()

// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser);
app.use("/assets", express.static(path.join(__dirname, "public/assets")))

//File Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// Routes with files
app.post("/api/auth/register", upload.single("picture"), register);

// Routes
app.use("/api/properties", propertyRoute)



mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server connected to PORT - ${PORT}`))
})

