import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {motion} from 'framer-motion';

import { useProductStore } from "../store/useProductStore";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { products, fetchProductsByCategory } = useProductStore();

  const { category } = useParams();
  const header = category.slice(0,1).toUpperCase() + category.slice(1)

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory, category]);

  console.log("Category products: ", products);
  return (
    <main className='w-full h-full mx-auto py-12'>
        <div className='w-full max-w-7xl flex flex-col items-center mx-auto'>
            <motion.div 
                className='flex justify-center'
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1}}
            >
                <h1 className='text-3xl sm:text-5xl font-bold text-emerald-500'>
                    {header}
                </h1>
            </motion.div>

            <motion.div
                className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-10'
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1}}
            >
                {products && products.map((product) => (
                    <ProductCard 
                        key={product._id}
                        product={product}
                    />

                ))}
            </motion.div>

            {products.length === 0 && (
                <motion.div
                    className='w-full text-3xl text-white font-bold mx-auto py-20 flex justify-center px-10'
                    initial={{opacity: 0, y:20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1}}
                >
                    No available product now
                </motion.div>
            )}
        </div>
    </main>
  );
};

export default CategoryPage;
