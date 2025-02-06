import {motion} from 'framer-motion';

import CategoryItem from '../components/CategoryItem';
import {CATEGORIES} from '../constants/data.js';

const HomePage = () => {
  return (
    <main className='w-full max-w-7xl min-h-screen flex flex-col items-between mx-auto py-12'>
      <motion.div 
        className='w-full flex flex-col items-center px-5 mx-auto'
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 1}}
      >
          <h1 className='text-3xl sm:text-5xl text-emerald-500 font-bold'>
            Explore Our Products
          </h1>
          <p className='text-gray-400 text-md mt-2'>
            Discover the lastest trends in eco-friendly fashion
          </p>
      </motion.div>

      
      <motion.div
        className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 px-10'
        initial={{opacity: 0, y:20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 1}}
      >
        {CATEGORIES.map((item) => (
          <CategoryItem 
            key={item.name}
            item={item}
          />
        ))}
      </motion.div>
    </main>
  )
}

export default HomePage