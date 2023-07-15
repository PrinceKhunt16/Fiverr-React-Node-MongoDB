import mongoose from "mongoose";
const { Schema } = mongoose;

const ConversationSchema = new Schema({
    id: { type: String, required: true, unique: true },
    seller_id: { type: String, required: true },
    buyer_id: { type: String, required: true },
    read_by_seller: { type: Boolean, required: true },
    read_by_buyer: { type: Boolean, required: true },
    last_message: { type: String, required: false },
}, {
    timestamps: true,
});

export default mongoose.model("Conversation", ConversationSchema);