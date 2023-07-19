import createError from "../utils/createError.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const createMessage = async (req, res, next) => {
    console.log(req.body);
    const newMessage = new Message({
        conversation_id: req.body.conversation_id,
        user_id: req.user_id,
        desc: req.body.desc,
    });

    try {
        const savedMessage = await newMessage.save();

        await Conversation.findOneAndUpdate(
            { id: req.body.conversation_id },
            {
                $set: {
                    read_by_seller: req.is_seller,
                    read_by_buyer: !req.is_seller,
                    last_message: req.body.desc,
                },
            },
            { new: true }
        );

        res.status(201).send(savedMessage);
    } catch (err) {
        next(err);
    }
};
export const getMessages = async (req, res, next) => {
    try {
        const messages = await Message.find({ conversation_id: req.params.id });
        res.status(200).send(messages);
    } catch (err) {
        next(err);
    }
};