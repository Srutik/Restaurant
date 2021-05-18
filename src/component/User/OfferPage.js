import React, { Component } from 'react'
import './OfferPage.css';
import Discount from './discount.png';
import UserNav from './User-Nav';

 class OfferPage extends Component {
    render() {
        return (
            <div>
                <UserNav />
                <div className="Banner_section">
                    <div className="Banner-title">Best Offers For You</div>
                    <div className="Banner-data">Exclusive Deals On Your Food !</div>
                    <div className="Banner-img">
                        <img height="200px" width="200px" src={Discount} />
                    </div>
                </div>
                <div className="offer-section">
                <div className="offer-link">
                    <div className="offer-type">Restaurant Offers</div>
                </div>
                </div>
            </div>
        )
    }
}

export default OfferPage;
