import express from "express";
import { getHealthInfo } from "../controllers/health.controller";

const router = express.Router();

router.get("/", getHealthInfo);

export default router;
