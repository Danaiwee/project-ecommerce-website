import { motion } from "framer-motion";
import { Star, Trash } from "lucide-react";

import { PRODUCT_TABLE_HEADERS } from "../constants/data.js";
import { useProductStore } from "../store/useProductStore.js";


const ProductLists = ({products}) => {
  const {toggleFeatured, deleteProduct} = useProductStore();

  return (
    <motion.div
      className="w-full max-w-5xl bg-gray-800 rounded-lg mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <table className="w-full divide-y-2 divide-gray-700">
        <thead>
          <tr>
            {PRODUCT_TABLE_HEADERS.map((item, index) => (
              <td
                key={index}
                className="uppercase text-sm text-gray-400 font-bold pb-2"
              >
                {item}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {products.map((item, index) => (
            <tr key={index}>
              <td className="flex items-center gap-3 py-4">
                <img src={item.image} className="size-10 rounded-full" />
                <p className="text-gray-100 text-md font-medium">{item.name}</p>
              </td>

              <td className="py-4">
                <p className="text-gray-400 text-md font-medium">
                  ${item.price}
                </p>
              </td>

              <td className="py-4">
                <p className="text-gray-400 text-md font-medium">
                  {item.category}
                </p>
              </td>

              <td className="py-4 relative">
                <div
                  className={`rounded-full w-10 h-10 ${
                    item.isFeatured ? "bg-amber-500 hover:bg-amber-400" : "bg-gray-700 hover:bg-gray-600"
                  } cursor-pointer`}
                  onClick={() => toggleFeatured(item._id)}
                >
                  <Star
                    className={`absolute size-7 top-5.5 left-1.5 ${
                      item.isFeatured ? "text-black" : "text-white"
                    } cursor-pointer`}
                  />
                </div>
              </td>

              <td className="py-4 relative">
                <Trash 
                  className='size-6 text-red-400 hover:text-red-300 cursor-pointer' 
                  onClick={() => deleteProduct(item._id)}
                />
              </td> 
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductLists;
