import React, { Component } from 'react'
import './ManagerHome.css';
import Sidesection from './Sidesection';
export class ManagerHome extends Component {
    render() {
        return (
            <div className="manager-dashboard">
                <div>
                    <Sidesection />
                    <div className="dash-title">Dashboard</div>

                </div>
            </div>
        )
    }
}

export default ManagerHome;
