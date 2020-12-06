import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import yelplogo from '../../images/yelp.png'
export class Navbar extends Component {
    render () {
        if ( cookie.load( 'auth' ) && cookie.load( 'type' ) === 'users' ) {
            return (
                <div>
                    <nav class="navbar navbar-expand-lg navbar-dark" style={ { backgroundColor: 'crimson' } }>
                        {/* <a class="navbar-brand" href=""> */ }
                        <img src={ yelplogo } width="60" height="30" alt="" />

                        {/* </a> */ }
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav ml-auto" >
                                <li class="nav-item">
                                    <Link class="nav-link" to="/users/dashboard" style={ { color: 'white' } }>Dashboard</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="/users/orders" style={ { color: 'white' } }>Orders</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="/users/events" style={ { color: 'white' } }>Events</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="/users/about" style={ { color: 'white' } }>About</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="/logout" style={ { color: 'white' } }>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                </div>
            )
        }
        else if ( cookie.load( 'auth' ) && cookie.load( 'type' ) === 'restaurants' ) {
            return (
                <div>
                    <nav class="navbar navbar-expand-lg navbar-dark" style={ { backgroundColor: 'crimson' } }>
                        <a class="navbar-brand" href="">
                            <img src={ yelplogo } width="60" height="30" alt="" />

                        </a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item">
                                    <Link class="nav-link" to="/restaurants/reviews" style={ { color: 'white' } }>Reviews</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="/restaurants/orders" style={ { color: 'white' } }>Orders</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="/restaurants/events" style={ { color: 'white' } }>Events</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="/restaurants/about" style={ { color: 'white' } }>About</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="/logout" style={ { color: 'white' } }>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                </div>
            )
        }
        else {
            return (
                <div>
                    <nav class="navbar navbar-expand-lg navbar-dark" style={ { backgroundColor: 'crimson' } }>
                        <a class="navbar-brand" href="">
                            <img src={ yelplogo } width="60" height="30" alt="" />

                        </a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav ml-auto" >
                                <li class="nav-item" >
                                    <Link class="nav-link" to="/login" style={ { color: 'white' } }>Login</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="/signup" style={ { color: 'white' } }>Signup</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                </div>
            )
        }

    }
}

export default Navbar
