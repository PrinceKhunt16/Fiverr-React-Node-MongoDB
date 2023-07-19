import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import Stripe from "stripe";

export const intent = async (req, res, next) => {
    const stripe = new Stripe(process.env.STRIPE);

    const gig = await Gig.findById(req.params.id);
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    const newOrder = new Order({
      gig_id: gig._id,
      img: gig.cover,
      title: gig.title,
      buyer_id: req.user_id,
      seller_id: gig.user_id,
      price: gig.price,
      payment_intent: paymentIntent.id,
    });
  
    await newOrder.save();
  
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
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
        const orders = await Order.findOneAndUpdate(
            {
                payment_intent: req.body.payment_intent,
            },
            {
                $set: {
                    is_completed: true,
                },
            }
        );

        res.status(200).send("Order has been confirmed.");
    } catch (err) {
        next(err);
    }
};