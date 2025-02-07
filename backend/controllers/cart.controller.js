import Product from "../models/product.model.js"

//may have to fix
export const getCartProducts = async(req, res) => {
    try {
        const user = req.user;

        //On this line we won't get the quantity
        const products = await Product.find({_id: {$in: user.cartItems}});

        //Add quantity to each product
        const cartItems = products.map((product) => {
            const item = user.cartItems.find((cartItem) => cartItem.id === product.id); // this line
            
            return {...product.toJSON(), quantity: item.quantity};
        });

        return res.status(200).json(cartItems);
    } catch (error) {
        console.log("Error in getCartProducts: ", error.message);
        res.status(500).json({message: error.message})
    }
};

//may have to fix
export const addToCart = async(req, res) => {
    try {
        const {productId} = req.body;
        const user = req.user;

        const existingItem = user.cartItems.find((item) => item.id === productId); // this line
        if(existingItem){
            existingItem.quantity += 1

        } else {
            user.cartItems.push(productId);
        }
        await user.save();

        return res.status(200).json(user.cartItems);
        
    } catch (error) {
        console.log("Error in addToCart cart contoller: ", error.message);
        throw new Error(error.message);
    }
};

export const removeAllFromCart = async(req, res) => {
    try {
        const {productId} = req.body;
        const user = req.user;

        if(!productId){
            user.cartItems = [];
        } else {
            user.cartItems = user.cartItems.filter(item => item.id !== productId);
        };

        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        console.log("Error in removeAllFromCart", error.message);
        res.status(500).json({message: error.message});
    }
};

export const updateQuantity = async(req, res) => {
    try {
        const {id: productId} = req.params;
        const {quantity} = req.body;

        const user = req.user;
        const existingItem = user.cartItems.find((item) => item.id === productId);

        if(existingItem){
            if(quantity === 0){
                user.cartItems.filter(item => item.id !== productId);
                
                await user.save();
                return res.status(200).json(user.cartItems);
            }

            existingItem.quantity = quantity;
            await user.save();

            return res.status(200).json(user.cartItems);
        } else {
            res.status(404).json({message: "Product not found"})
        };
    } catch (error) {
        console.log("Error in updateQuantity: ", error.message);
        res.status(500).json({message: error.message});
    }
};