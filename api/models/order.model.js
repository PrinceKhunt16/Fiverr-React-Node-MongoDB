import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema({
    gig_id: { type: String, required: true },
    img: { type: String, required: false },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    seller_id: { type: String, required: true },
    buyer_id: { type: String, required: true },
    is_completed: { type: Boolean, default: false },
    payment_intent: { type: String, required: true },
}, {
    timestamps: true
});

export default mongoose.model("Order", OrderSchema);