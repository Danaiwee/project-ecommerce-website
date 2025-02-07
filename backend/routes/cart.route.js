import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { addToCart, getCartProducts, removeAllFromCart, updateQuantity } from '../controllers/cart.controller.js';

const router = express.Router();

router.get("/", protectRoute, getCartProducts);
router.post("/", protectRoute, addToCart );
router.put("/:id", protectRoute, updateQuantity);
router.delete("/", protectRoute, removeAllFromCart);

export default router;