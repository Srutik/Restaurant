import React from 'react';
import UserNav from './User-Nav';
import UserProfile from './User-Profile';
import './User-Home.css';

function UserHome() {
    return (
        <>
        <UserNav />
        <UserProfile />
        </>
    )
}

export default UserHome;