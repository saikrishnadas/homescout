import express from "express";
import { getAllProperties } from "../controllers/properties.js"

const router = express.Router();

router.get("/", getAllProperties)

export default router;
