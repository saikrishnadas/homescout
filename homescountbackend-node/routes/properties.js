import express from "express";
import { createProperty, getAllProperties } from "../controllers/properties.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router();

router.get("/", getAllProperties)
router.post("/", verifyToken, createProperty)

export default router;
