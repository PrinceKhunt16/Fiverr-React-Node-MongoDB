import React from 'react';
import { cards } from '../../../data';
import CategoryCard from '../../components/catogoryCard/CategoryCard';
import Featured from '../../components/featured/featured';
import Slide from '../../components/slide/Slide';
import TrustedBy from '../../components/trustedBy/TrustedBy';
import "./Home.scss";

const Home = () => {
    return (
        <div className='home'>
            <Featured />
            <TrustedBy />
            <Slide slidesToShow={5} arrowsScroll={5}>
                {cards.map((card) => (
                    <CategoryCard key={card.id} card={card} />
                ))}
            </Slide>
        </div>
    )
}

export default Home