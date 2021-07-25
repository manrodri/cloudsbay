import React from "react";
import { Link } from 'react-router-dom';

const UserNav = () => {
    return (
        <nav className="nav flex-column">
            <li className={'nav-item'}>
                <Link className={`nav-link`} to={'/user/history'}>History</Link>
            </li>
            <li className={'nav-item'}>
                <Link  className={`nav-link`}  to={'/user/password'}>Password</Link>
            </li>
            <li className={'nav-item'}>
                <Link className={`nav-link`}  to={'/user/wishlist'}>Whislist</Link>
            </li>
        </nav>
    )
}

export default UserNav;