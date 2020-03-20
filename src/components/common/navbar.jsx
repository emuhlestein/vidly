import React from 'react';
import { Route } from 'react-router-dom';
import Customers from '../customers';
import Rentals from '../rentals';
import Movies from '../movies';
import { Link } from 'react-router-dom';

export function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Vidly</a>

            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link to='/movies'>Movies</Link>
                </li>
                <li className="nav-item">
                    <Link to='/customers'>Customers</Link>
                </li>
                <li className="nav-item">
                    <Link to='/rentals'>Rentals</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;