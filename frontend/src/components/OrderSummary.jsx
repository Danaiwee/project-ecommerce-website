import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { useCartStore } from "../store/useCartStore.js";

const OrderSummary = ({ total, subtotal, coupon, isCouponApplied }) => {
  const { clearCart } = useCartStore();

  const originalPrice = subtotal.toFixed(2);
  const totalPrice = total.toFixed(2);
  const discount = coupon
    ? (originalPrice * coupon.discountPercentage) / 100
    : 0;
  const totalDisCount = discount.toFixed(2);

  const handlePayment = async () => {
    await clearCart();
  };

  return (
    <div className="flex flex-col py-6 px-6 bg-gray-800 rounded-md">
      <h3 className="font-medium text-emerald-500 text-lg">Order summary</h3>

      <div className="flex flex-col w-full mt-3 border-b border-gray-700 pb-1 gap-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">Original price</p>
          <p className="text-sm font-bold text-white">${originalPrice}</p>
        </div>

        {coupon && isCouponApplied && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Discount</p>
            <p className="text-sm font-bold text-gray-400">${totalDisCount}</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-3">
        <p className="text-sm font-bold text-white">Total</p>
        <p className="text-sm font-bold text-emerald-500">${totalPrice}</p>
      </div>

      <motion.button
        className="w-full py-2 rounded-md bg-emerald-600 hover:bg-emerald-400 text-sm font-bold mt-3 cursor-pointer"
        onClick={handlePayment}
        whileTap={{ scale: 0.98 }}
      >
        <Link to="/payment-success">Proceed to checkout</Link>
      </motion.button>

      <div className="flex items-center justify-center mt-5">
        <p className="text-xs font-medium text-gray-500">or&nbsp;</p>
        <Link to="/" className="flex items-center gap-1">
          <p className="text-xs font-medium text-emerald-500 underline">
            continue shopping
          </p>
          <ArrowRight className="size-3 text-emerald-500" />
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
