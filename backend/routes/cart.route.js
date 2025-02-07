import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { addToCart, clearCart, getCartProducts, removeAllFromCart, updateQuantity } from '../controllers/cart.controller.js';

const router = express.Router();

router.get("/", protectRoute, getCartProducts);
router.post("/", protectRoute, addToCart );
router.put("/:id", protectRoute, updateQuantity);
router.delete("/", protectRoute, removeAllFromCart);
router.delete("/clear", protectRoute, clearCart);

export default router;