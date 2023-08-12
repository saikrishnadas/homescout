import express from "express";
import { login } from "../controllers/auth.js";
import { handleLogout } from "../controllers/logout.js";
import { handleRefreshToken } from "../controllers/refreshToken.js";

const router = express.Router();

router.post("/login", login)

router.get("/logout", handleLogout)

router.get("/refresh", handleRefreshToken)


export default router;
