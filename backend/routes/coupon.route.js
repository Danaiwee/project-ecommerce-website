import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createCoupon,
  deleteCoupon,
  getCoupon,
  validateCoupon,
} from "../controllers/coupon.controller.js";

const router = express.Router();

router.get("/", protectRoute, getCoupon);
router.post("/validate", protectRoute, validateCoupon);
router.delete("/", protectRoute, deleteCoupon);

//modified
router.post("/create", protectRoute, createCoupon);
export default router;
