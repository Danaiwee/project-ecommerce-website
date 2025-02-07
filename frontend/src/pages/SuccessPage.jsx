import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Confetti from 'react-confetti';

const SuccessPage = () => {
  const orderNumber = "#" + Math.floor(Math.random() * 10000000000);
  return (
    <main className="w-full h-screen overflow-hidden py-20 px-5">
      <Confetti 
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{zIndex: 99}}
        numberOfPieces={700}
        recycle={false}
      />  
      <motion.div
        className="w-full h-[60vh] flex items-center justify-center mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full max-w-md bg-gray-800 rounded-lg px-10 py-6 flex flex-col items-center gap-1">
          <CheckCircle className="text-emerald-500 size-14" />
          <h1 className="text-2xl font-bold text-emerald-500">
            Purchase Successful!
          </h1>
          <p className="text-sm text-gray-200 text-center">
            Thank you for your order. We're processing it now.
          </p>
          <p className="text-xs text-emerald-500">
            Check your email for order details and update.
          </p>

          <div className="w-full max-w-[380px] rounded-md  bg-gray-600 flex flex-col px-5 py-2 mt-5 gap-1">
            <div className="flex items-center justify-between">
              <p className="text-xs sm:text-sm text-gray-200 ">Order number:</p>
              <p className="text-xs sm:text text-emerald-500 font-medium">
                {orderNumber}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs sm:text text-gray-200">Estimated delivery:</p>
              <p className="text-xs sm:text text-emerald-500 font-medium">
                3-5 business days
              </p>
            </div>
          </div>

          <motion.button
            className="w-full py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 mt-2 cursor-pointer mb-5"
            whileTap={{ scale: 0.95 }}
          >
            <Link to='/' className='flex items-center gap-2'>
              Back to shopping
              <ArrowRight className="size-4 text-white" />
            </Link>
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
};

export default SuccessPage;
