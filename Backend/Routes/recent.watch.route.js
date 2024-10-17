import { Router } from "express";
import { getRecentWatch, saveRecentWatch } from "../Controllers/recent.watch.controller.js";

const router = Router();

router.post("/save", saveRecentWatch);
router.get("/get", getRecentWatch);
export default router;