import React, { Component } from 'react'
import './Dashboard.css';
import Sidesection from './Sidesection';
export class Dashboard extends Component {
    render() {
        return (
            <div className="manager-dash">
                <Sidesection />
            </div>
        )
    }
}

export default Dashboard;