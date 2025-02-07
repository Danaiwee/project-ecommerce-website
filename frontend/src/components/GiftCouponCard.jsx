import { useState } from "react";
import { motion } from "framer-motion";

const GiftCouponCard = () => {
  const [coupon, setCoupon] = useState("");
  const voucher = false;

  const handleInputChange = (e) => {
    setCoupon(e.target.value);
  };

  const handleCouponSubmit = (e) => {
    e.preventDefault();

    console.log(coupon);
  }
  return (
    <div className="flex flex-col py-6 px-6 bg-gray-800 rounded-md mt-5">
      <p className="text-sm font-medium text-gray-300">
        Do you have a voucher or gift card?
      </p>
      <input
        className="w-full px-2 py-1 text-md bg-gray-700 text-gray-400 rounded-md mt-2 border-none outline-none focus:outline-none focus:ring-1 focus:ring-emerald-500"
        id="coupon"
        name="coupon"
        value={coupon}
        onChange={handleInputChange}
      />
      <motion.button
        className="w-full py-2 rounded-md bg-emerald-600 hover:bg-emerald-400 text-sm font-bold mt-3 cursor-pointer"
        whileTap={{ scale: 0.98 }}
        onClick={handleCouponSubmit}
      >
        Check coupon
      </motion.button>

      {voucher && (
        <div className="flex flex-col mt-5">
          <p className="text-md text-white font-medium">
            This vouvher is available:
          </p>

          <div className="flex items-center gap-1">
            <p className="text-xs text-gray-400">AFISE52DF33</p>
            <p className="text-xs text-gray-400">-</p>
            <p className="text-xs text-gray-400">10% off</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftCouponCard;
