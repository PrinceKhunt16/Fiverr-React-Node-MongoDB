import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import newRequest from '../../utils/newRequest';
import Review from '../review/Review';
import "./Reviews.scss";

const Reviews = ({ gig_id }) => {
    const queryClient = useQueryClient();
    const { isLoading, error, data } = useQuery({
        queryKey: ["reviews"],
        queryFn: () =>
            newRequest.get(`/reviews/${gig_id}`).then((res) => {
                return res.data;
            }),
    });

    const mutation = useMutation({
        mutationFn: (review) => {
            return newRequest.post('/reviews', review);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["reviews"]);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const desc = e.target[0].value;
        const star = e.target[1].value;
        mutation.mutate({ gig_id, desc, star });
    }

    console.log(data);

    return (
        <div className="reviews">
            <h2>Reviews</h2>
            {isLoading
                ? "Loading"
                : error
                    ? "Something went wrong!"
                    : data.map((review) => <Review key={review._id} review={review} />)
            }
            <div className="add">
                <h3>Add a review</h3>
                <form action="" className="addForm" onSubmit={handleSubmit}>
                    <input type="text" placeholder="write your opinion" />
                    <select name="" id="">
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <button>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Reviews