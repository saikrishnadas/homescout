import express from "express";
import { createProperty, filterProperties, getAllProperties, getProperty } from "../controllers/properties.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router();

router.get("/", getAllProperties)
router.post("/", verifyToken, createProperty)
router.get("/filter", filterProperties);
router.get("/:id", getProperty)

export default router;
