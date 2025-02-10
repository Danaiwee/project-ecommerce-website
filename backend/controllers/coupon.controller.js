import Coupon from "../models/coupon.model.js";

export const getCoupon = async(req, res) => {
    try {
        const userId = req.user._id;
        
        const coupon = await Coupon.findOne({userId: userId, isActive: true});
        if(!coupon){
            return res.status(200).json({message: "No available coupon"})
        };

        return res.status(200).json(coupon);
    } catch (error) {
        console.log("Error in getCoupon controller: ", error.message);
        res.status(500).json({message: error.message})
    }
};

export const validateCoupon = async(req, res) => {
    try {
		const { code } = req.body;
		const coupon = await Coupon.findOne({ code: code, userId: req.user._id, isActive: true });

		if (!coupon) {
			return res.status(404).json({ message: "Coupon not found" });
		}

		if (coupon.expirationDate < new Date()) {
			coupon.isActive = false;
			await coupon.save();
			return res.status(404).json({ message: "Coupon expired" });
		}

		res.json({
			message: "Coupon is valid",
			code: coupon.code,
			discountPercentage: coupon.discountPercentage,
		});
	} catch (error) {
		console.log("Error in validateCoupon controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

//modified
export const createCoupon = async(req, res) => {
    const userId = req.user._id;
    await Coupon.findOneAndDelete({userId});

    const newCoupon = new Coupon({
        code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        discountPercentage: 10,
        expireDate: new Date(Date.now() + 30*24*60*60*1000),
        userId: userId
    });

    await newCoupon.save();

    return newCoupon;
};
export const deleteCoupon = async (req, res) => {
    try {
        const {code} = req.body;

        const coupon = await Coupon.findOneAndDelete({code});
        

        return res.status(200).json(coupon);
    } catch (error) {
        console.log("Error in delete coupon: ", error.message);
        throw new Error(error.message);
    }
}

