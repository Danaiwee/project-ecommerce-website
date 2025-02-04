import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { addToCart, getCartProducts, updateQuantity } from '../controllers/cart.controller.js';
import { deleteProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.get("/", protectRoute, getCartProducts);
router.put("/", protectRoute, addToCart );
router.put("/:id", protectRoute, updateQuantity);
router.delete("/", protectRoute, deleteProduct);

export default router;