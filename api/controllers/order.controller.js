import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";

export const intent = async (req, res, next) => {

};

export const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({
            ...(req.is_seller ? { seller_id: req.user_id } : { buyer_id: req.user_id }),
            is_completed: true,
        });

        res.status(200).send(orders);
    } catch (err) {
        next(err);
    }
};

export const confirm = async (req, res, next) => {
    try {
        // const orders = await Order.findOneAndUpdate(
        //     {
        //         payment_intent: req.body.payment_intent,
        //     },
        //     {
        //         $set: {
        //             isCompleted: true,
        //         },
        //     }
        // );

        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(200).send("Order has been confirmed.");
    } catch (err) {
        next(err);
    }
};