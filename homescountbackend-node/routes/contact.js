import express from "express";
import { getContact } from "../controllers/contact.js";

const router = express.Router();

router.post("/getContact", getContact)

export default router;
