import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 5);

        const newUser = new User({
            ...req.body,
            password: hash
        });

        await newUser.save();

        res.status(201).send("User has been created.");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Something went wrong.");
    }
}

export const login = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
        return res.status(404).send("User not found.");
    }

    const isCorrect = bcrypt.compare(user.password, req.body.password);

    if (!isCorrect) {
        return res.status(400).send("Wrong password or username.");
    }

    const token = jwt.sign(
        {
            id: user._id,
            is_seller: user.is_seller,
        },
        process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    
    res.cookie("accessToken", token, { httpOnly: true }).status(200).send(info);
}

export const logout = async (req, res) => {

}