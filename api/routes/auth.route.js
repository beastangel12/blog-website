import express from "express";
import { signin, signup } from "../controllers/auth.controller.js";
const router = express.Router();

// post router because we will gonna create something

router.post("/signup", signup);
router.post("/signin", signin);

export default router;
