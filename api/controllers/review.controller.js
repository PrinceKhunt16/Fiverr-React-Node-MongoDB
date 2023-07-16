import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";

export const createReview = async (req, res, next) => {
    if (req.is_seller)
        return next(createError(403, "Sellers can't create a review!"));

    const newReview = new Review({
        user_id: req.user_id,
        gig_id: req.body.gig_id,
        desc: req.body.desc,
        star: req.body.star,
    });

    try {
        const review = await Review.findOne({
            gig_id: req.body.gig_id,
            user_id: req.user_id,
        });

        if (review)
            return next(
                createError(403, "You have already created a review for this gig!")
            );

        const savedReview = await newReview.save();

        await Gig.findByIdAndUpdate(req.body.gig_id, {
            $inc: { total_stars: req.body.star, star_number: 1 },
        });

        res.status(201).send(savedReview);
    } catch (err) {
        next(err);
    }
};

export const getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({ gig_id: req.params.gig_id });
        res.status(200).send(reviews);
    } catch (err) {
        next(err);
    }
};

export const deleteReview = async (req, res, next) => {
    try {
    } catch (err) {
        next(err);
    }
};