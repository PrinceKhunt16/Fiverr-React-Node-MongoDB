import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js";

export const createConversation = async (req, res) => {
    const newConversation = new Conversation({
        id: req.is_seller ? req.user_id + req.body.to : req.body.to + req.user_id,
        seller_id: req.is_seller ? req.user_id : req.body.to,
        buyer_id: req.is_seller ? req.body.to : req.user_id,
        read_by_seller: req.is_seller,
        read_by_buyer: !req.is_seller,
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(201).send(savedConversation);
    } catch (err) {
        next(err);
    }
}

export const updateConversation = async (req, res) => {
    try {
        const updatedConversation = await Conversation.findOneAndUpdate(
            { id: req.params.id },
            {
                $set: {
                    ...(req.is_seller ? { read_by_seller: true } : { read_by_buyer: true }),
                },
            },
            { new: true }
        );

        res.status(200).send(updatedConversation);
    } catch (err) {
        next(err);
    }
}

export const getSingleConversation = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({ id: req.params.id });
        if (!conversation) return next(createError(404, "Not found!"));
        res.status(200).send(conversation);
    } catch (err) {
        next(err);
    }
}

export const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find(
            req.is_seller ? { seller_id: req.user_id } : { buyer_id: req.user_id }
        ).sort({ updatedAt: -1 });

        console.log(conversations);
        res.status(200).send(conversations);
    } catch (err) {
        next(err);
    }
}