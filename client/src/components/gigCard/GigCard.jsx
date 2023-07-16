import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import "./GigCard.scss";

const GigCard = ({ item }) => {
    const { isLoading, error, data } = useQuery({
        queryKey: [item.user_id],
        queryFn: () =>
            newRequest.get(`/users/${item.user_id}`).then((res) => {
                return res.data;
            }),
    });

    return (
        <Link to={`/gig/${item._id}`} className="link">
            <div className="gigCard">
                <img src={item.cover} alt="" />
                <div className="info">
                    {isLoading ? (
                        "loading"
                    ) : error ? (
                        "Something went wrong!"
                    ) : (
                        <div className="user">
                            <img src={data.img || "/img/noavatar.jpg"} alt="" />
                            <span>{data.username}</span>
                        </div>
                    )}
                    <p>{item.desc}</p>
                    <div className="star">
                        <img src="./img/star.png" alt="" />
                        <span>
                            {!isNaN(item.total_stars / item.star_number) && Math.round(item.total_stars / item.star_number)}
                        </span>
                    </div>
                </div>
                <hr />
                <div className="detail">
                    <img src="./img/heart.png" alt="" />
                    <div className="price">
                        <h2>$ {item.price}<sup>99</sup></h2>
                    </div>
                </div>
            </div>
        </Link>

    )
}

export default GigCard