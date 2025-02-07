import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllProducts = async(req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      res.status(404).json({ message: "Products not found" });
    }

    return res.status(200).json({ products: products });
  } catch (error) {
    console.log("Error in getAllProducts: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getFeaturedProducts = async(req, res) => {
  try {
    //fetch data from redis in folder "featured_products"
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.status(200).json(JSON.parse(featuredProducts));
    }

    //if it is not in redis, fetch data from mongoDB
    // .lean() is gonna return a plain javascript object instead of a mongodb document
    // which is good for performance
    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (!featuredProducts) {
      return res.status(404).json({ message: "No features products found" });
    }

    //If found, store the featureProducts in redis for quick access
    await redis.set("featured_products", JSON.stringify(featuredProducts));

    return res.status(200).json(featuredProducts);
  } catch (error) {
    console.log("Erro in getFeaturedProducts: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async(req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const imageResponse = await cloudinary.uploader.upload(image, {folder: "ecom-products"});
    const imageUrl = imageResponse.secure_url;

    const newProduct =  new Product({
        name,
        description,
        price,
        image: imageUrl || '',
        category
    });
    newProduct.save();

    return res.status(200).json(newProduct);

  } catch (error) {
    console.log("Error in cratePost: ", error.message);
    res.status(500).json({message: error.message})
  }
};

export const deleteProduct = async(req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({message: "Product not found"})
        };

        if(product.image){
            const imageId = product.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`ecom-products/${imageId}`);
        };

        await Product.findByIdAndDelete(productId);

        return res.status(200).json({message: "Deleted product successfully"})
        
    } catch (error) {
        console.log("Error in deleteProduct: ", error.message);
        res.status(500).json({message: error.message})
    };
};

export const getRecommendedProducts = async(req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: {size: 3}
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1
                }
            }
        ]);

        return res.status(200).json(products);
    } catch (error) {
        console.log("Error in getRecommendedProducts: ", error.message);
        res.status(500).json({message: error.message})
    };
};

export const getProductsByCategory = async(req, res) => {
    try {
        const category = req.params.category;
        const products = await Product.find({category});
        if(!products){
            res.status(404).json({message: "Products not found"});
        };

        return res.status(200).json({products});
    } catch (error) {
        console.log("Error in getProductsByCategory: ", error.message);
        res.status(500).json({message: error.message})
    };
};


//this function may have to fix later
export const toggleFeaturedProduct = async(req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({message: "Product not found"})
        };

        //update in mongoDB
        const updatedProducts = await product.updateOne({isFeatured: !product.isFeatured});
        
        //update in redis
        const featuredProducts = await Product.find({isFeatured: true}).lean();
        await redis.set("featured_products", JSON.stringify(featuredProducts));

        return res.status(200).json(updatedProducts);

    } catch (error) {
        console.log("Error in toggleFeatureProduct: ", error.message);
        res.status(500).json({message: error.message})
    }
};
