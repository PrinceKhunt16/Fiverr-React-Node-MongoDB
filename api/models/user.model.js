import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    desc: { type: String, required: true },
    is_seller: { type: Boolean, required: true }
}, {
    timestamps: true
});

export default mongoose.model("User", userSchema);