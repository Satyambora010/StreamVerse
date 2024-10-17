import { Router } from "express";
import { createOrder } from "../Controllers/payment.controller.js";

const router = Router();

router.post("/create-order", createOrder);

export default router;