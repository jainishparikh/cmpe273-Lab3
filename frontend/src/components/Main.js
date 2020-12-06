import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Signup from './Signup/Signup';
import Navbar from './LandingPage/Navbar';
import Home from './LandingPage/home';
import Login from './Login/Login';
import Logout from './Login/Logout';
//User
import UsersDashboard from './Users/Dashboard/Dashboard';
import UserAbout from "./Users/Profile/About";
import EditUserProfile from "./Users/Profile/Profile";
import UserEvents from './Users/Events/Events';
import RestaurantProfile from './Users/Profile/RestaurantProfile';
import UserOrders from './Users/Orders/Orders';
//restaurant
import RestaurantAbout from "./Restaurant/Profile/About";
import EditRestaurantProfile from "./Restaurant/Profile/Profile";
import RestaurantReviews from "./Restaurant/Reviews/Reviews";
import RestaurantEvents from "./Restaurant/Events/Events";
import UserProfiles from "./Restaurant/Profile/UserProfile"
import RestaurantOrders from './Restaurant/Orders/Orders';

export class Main extends Component {
    render () {
        return (
            <div>
                <Route path='/' component={ Navbar } />
                <Route exact path='/' component={ Home } />
                <Route path='/signup' component={ Signup } />
                <Route path='/login' component={ Login } />
                <Route path='/logout' component={ Logout } />

                <Route path='/users/dashboard' component={ UsersDashboard } />
                <Route path='/users/about' component={ UserAbout } />
                <Route path='/users/editprofile' component={ EditUserProfile } />
                <Route path='/users/events' component={ UserEvents } />
                <Route path='/users/restaurantprofiles/:restaurantEmail/:restaurantID' component={ RestaurantProfile } />
                <Route path='/users/orders' component={ UserOrders } />

                <Route path='/restaurants/about' component={ RestaurantAbout } />
                <Route path='/restaurants/editprofile' component={ EditRestaurantProfile } />
                <Route path='/restaurants/reviews' component={ RestaurantReviews } />
                <Route path='/restaurants/events' component={ RestaurantEvents } />
                <Route path='/restaurants/userprofiles/:userEmail/:userID' component={ UserProfiles } />
                <Route path='/restaurants/orders' component={ RestaurantOrders } />

            </div>
        )
    }
}

export default Main