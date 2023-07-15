import mongoose from "mongoose";
const { Schema } = mongoose;

const GigSchema = new Schema({
    user_id: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    total_stars: { type: Number, default: 0 },
    star_number: { type: Number, default: 0 },
    cat: { type: String, required: true },
    price: { type: Number, required: true },
    cover: { type: String, required: true},
    images: { type: [String], required: false },
    short_title: { type: String, required: true },
    short_desc: { type: String, required: true },
    delivery_time: { type: Number, required: true },
    revision_number: { type: Number, required: true },
    features: { type: [String], required: false },
    sales: { type: Number, default: 0 }
}, {
    timestamps: true,
});

export default mongoose.model("Gig", GigSchema);