import { useState } from "react";
import { SquareChartGantt, DollarSign, Upload, Check } from "lucide-react";
import {motion} from 'framer-motion';

import InputField from "./InputField";
import { PRODUCT_CATEGORIES } from "../constants/data";
import { useProductStore } from "../store/useProductStore.js";

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  
  const {createProduct, loading} = useProductStore();

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    setFormData({...formData, [name]: value});
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData({...formData, image: reader.result});
      };

      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await createProduct(formData);

    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
    })
  };
  return (
    <motion.div 
      className="w-full max-w-xl p-6 rounded-md bg-gray-900 sm:mx-auto"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 1}}
    >
      <form className="w-full flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <InputField
          label="Product Name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          icon={SquareChartGantt}
        />

        <div className="w-full flex flex-col">
          <label
            className="text-gray-300 text-md font-medium"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="w-full h-30 text-md bg-gray-700 rounded-md p-3 text-gray-300 border-none outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <InputField
          type="number"
          label="Price"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          icon={DollarSign}
        />

        <div className="w-full flex flex-col">
          <label
            className="text-gray-300 text-md font-medium"
            htmlFor="category"
          >
            Category
          </label>
          <select
            className="w-full h-9 text-md bg-gray-700 rounded-md pl-2 text-gray-300 border-none outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 cursor-pointer"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Please select category</option>
            {PRODUCT_CATEGORIES.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <div className="w-fit flex items-center gap-2 bg-gray-700 px-5 py-2 rounded-md cursor-pointer">
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="sr-only"
              accept="image/*"
            />
            <Upload className="text-gray-300 size-5" />
            <label
              htmlFor="image"
              className="text-md text-gray-300 cursor-pointer"
            >
              Upload image
            </label>

          </div>
            {formData.image && (
              <div className='flex items-center gap-1 text-sm text-gray-500 pl-3'>
                <span>Image uploaded</span>
                <Check className='size-4' />
              </div>
            )}
        </div>

        <button
          className='w-full mx-auto py-2 bg-emerald-600 rounded-md text-gray-200 cursor-pointer font-bold'
          type='submit'
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
