import express from "express";
import { signup } from "../controllers/auth.controller.js";
const router = express.Router();

// post router because we will gonna create something

router.post("/signup", signup);

export default router;
