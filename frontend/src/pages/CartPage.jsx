import { motion } from "framer-motion";
import jacketImg from "/jackets.jpg";

import CartItem from "../components/CartItem";
import ProductCard from "../components/ProductCard";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";
import { useCartStore } from "../store/useCartStore";
import { useProductStore } from "../store/useProductStore";
import { useEffect } from "react";

const CartPage = () => {
  const {cart, total, subtotal, coupon, isCouponApplied} = useCartStore();
  const {fetchRecommendedProducts, products} = useProductStore();

  useEffect(() => {
    fetchRecommendedProducts();
  }, [fetchRecommendedProducts])
  
  return (
    <main className="w-full h-full py-12 mx-auto">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row lg:justify-between mx-auto px-10 gap-5">
        <motion.div
          className="flex flex-col w-full max-w-4xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {cart && cart.map((product) => (
              <CartItem 
                key={product._id}
                product={product}
              />
          ))}  
          

          <h1 className="text-2xl text-emerald-600 font-bold mt-5 mb-3">
            People also bought
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-auto">
            {products && products.map((product) => (
                <ProductCard
                    key={product._id} 
                    product={product} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="w-full flex-1 flex flex-col"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
            <OrderSummary 
                total={total}
                subtotal={subtotal}
                coupon={coupon}
                isCouponApplied={isCouponApplied}
            />
            <GiftCouponCard />
        </motion.div>
      </div>
    </main>
  );
};

export default CartPage;
