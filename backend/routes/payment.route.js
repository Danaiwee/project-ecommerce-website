import express from "express";
import {
  checkoutSuccess,
  createCheckoutSession,
  createOrder,
} from "../controllers/payment.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/checkout-success", protectRoute, checkoutSuccess);

//modified
router.post("/create", protectRoute, createOrder);

export default router;
