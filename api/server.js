import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();
dotenv.config();

mongoose.set('strictQuery', true);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connect');
    } catch (err) {
        console.error(err);
    }
}

app.listen(4000, async () => {
    await connect();
    console.log("Backend server is running.");
});