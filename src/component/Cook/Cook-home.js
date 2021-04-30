import React, { Component } from 'react'
import './Cook-home.css';
import CookSidesection from './Cook-sidesection';
export class CookHome extends Component {
    render() {
        return (
            <div className="cook-home">
            <div>
                 <CookSidesection />
                 </div>  
                    <div className="dash-title">Dashboard</div>
            </div>
        )
    }
}

export default CookHome;