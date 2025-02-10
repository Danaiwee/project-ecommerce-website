import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from 'lucide-react';

import { useCartStore } from "../store/useCartStore.js";

const GiftCouponCard = () => {
  const [code, setCode] = useState("");

  const { coupon, checkCoupon, getCoupon, deleteCoupon } = useCartStore();

  useEffect(() => {
    getCoupon();
  }, [getCoupon]);


  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleCouponSubmit = async (e) => {
    e.preventDefault();

    console.log(code);
    await checkCoupon(code);
    
  };
  return (
    <div className="flex flex-col py-6 px-6 bg-gray-800 rounded-md mt-5">
      <p className="text-sm font-medium text-gray-300">
        Do you have a voucher or gift card?
      </p>
      <input
        className="w-full px-2 py-1 text-md bg-gray-700 text-gray-400 rounded-md mt-2 border-none outline-none focus:outline-none focus:ring-1 focus:ring-emerald-500"
        id="coupon"
        name="coupon"
        value={code}
        onChange={handleInputChange}
      />
      <motion.button
        className="w-full py-2 rounded-md bg-emerald-600 hover:bg-emerald-400 text-sm font-bold mt-3 cursor-pointer"
        whileTap={{ scale: 0.98 }}
        onClick={handleCouponSubmit}
      >
        Check coupon
      </motion.button>

      {coupon && (
        <div className="flex flex-col mt-5">
          <p className="text-md text-white font-medium">
            This vouvher is available:
          </p>

          <div className="flex items-center justify-between">
            <div className='flex items-center gap-1'>
              <p className="text-xs text-gray-400">{coupon.code}</p>
              <p className="text-xs text-gray-400">-</p>
              <p className="text-xs text-gray-400">
                {coupon.discountPercentage}% off
              </p>
            </div>

            <X 
              className='size-3 text-red-400 hover:text-red-300 cursor-pointer' 
              onClick={async() => await deleteCoupon()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftCouponCard;
