import express from "express";
import { createProperty, filterProperties, getAllProperties, getProperty, updatePropertyType, updateProperty, deleteProperty, sortProperties } from "../controllers/properties.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router();

router.get("/", getAllProperties)
// router.post("/create", verifyToken, createProperty)
router.post("/create", createProperty)
router.get("/filter", filterProperties);
router.post("/sort", sortProperties);
router.get("/:id", getProperty)
router.post("/update/:id", updateProperty)
router.delete("/delete/:id", deleteProperty)
// router.get("/updatePropertyType", updatePropertyType);

export default router;
