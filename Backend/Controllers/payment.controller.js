import Razorpay from "razorpay";
import { ENV_VARS } from "../Config/envVars.js";

export const createOrder = async (req, res) => {
    try {
        const {amount , currency="INR"} = req.body;
        const razorpay = new Razorpay({
            key_id: ENV_VARS.RAZORPAY_PUBLIC_KEY,
            key_secret: ENV_VARS.RAZORPAY_SECRET_KEY
        })
        const options = {
            amount: amount * 100,
            currency: currency,
            receipt: `order_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error creating order",
            error: error.message
        });
    }
    

};