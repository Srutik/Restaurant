import React, { Component } from 'react'
import Sidesection from './Sidesection';
import './offers.css';


export class offers extends Component {
    render() {
        return (
            <div>
                <Sidesection />
                <h1 className="offer-label">Offers</h1>
            </div>
        )
    }
}

export default offers;
