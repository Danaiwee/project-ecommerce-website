import { Minus, Plus, Trash } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "../store/useCartStore";

const CartItem = ({product}) => {
  const {removeFromCart, updateQuantity} = useCartStore();

  const handleRemoveItem = () => {
    removeFromCart(product._id);
  };

  const handleIncrease = () => {
    updateQuantity(product._id, product.quantity + 1);
  };

  const handleDecrease = () => {
    updateQuantity(product._id, product.quantity - 1);
  };
  return (
    <div className="w-full bg-gray-800 p-6 rounded-md flex flex-col sm:flex-row justify-between mb-3">
      <div className="flex items-center justify-between sm:justify-start gap-5">
        <img src={product.image} className="w-35 h-20 object-contain overflow-hidden" />

        <div className="flex flex-col gap-3">
          <div>
            <p className="text-sm sm:text-md font-medium text-white">{product.name}</p>
            <p className="text-xs sm:text-sm text-gray-400">{product.description}</p>
          </div>
          <Trash 
            className="size-4 sm:size-5 text-red-500 hover:text-red-400 cursor-pointer"
            onClick={handleRemoveItem} 
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-20 mt-5 sm:mt-0">
        <div className="w-full flex items-center gap-2">
          <motion.button
            className="relative bg-gray-700 rounded-md p-0.5 cursor-pointer hover:ring-2 hover:ring-emerald-600 transition-all duration-300"
            whileTap={{ scale: 0.8 }}
            transition={{ duration: 0 }}
            onClick={handleDecrease}
          >
            <Minus className="size-4" />
          </motion.button>
          <p className="text-sm text-white font-medium">{product.quantity}</p>
          <motion.button
            className="relative bg-gray-700 rounded-md p-0.5 cursor-pointer hover:ring-2 hover:ring-emerald-600 transition-all duration-300"
            whileTap={{ scale: 0.8 }}
            transition={{ duration: 0 }}
            onClick={handleIncrease}
          >
            <Plus className="size-4" />
          </motion.button>
        </div>

        <p className="w-15 text-md text-emerald-600 font-bold">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;
