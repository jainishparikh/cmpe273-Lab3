import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import cookie from 'react-cookies';
import Modal from 'react-modal';
import axios from 'axios';
import GetDishes from '../Orders/GetDishes';
import OrderNow from '../Orders/OrderNow';
import BACKEND_URL from '../../../config/config';
import profile_picture from '../../../images/restaurant.jpeg';
import AddReview from '../Reviews/AddReview'

export class RestaurantProfile extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            restaurantID: "",
            name: "",
            email: "",
            contact: "",
            location: "",
            description: "",
            timing: "",
            dishPopUp: false,
            profileImagePath: profile_picture,
            images: [],
            Orders: [],
            reviewPopUp: false,
            orderPopUp: false,
        }

    }
    componentDidMount () {
        let email = this.props.match.params.restaurantEmail
        axios.get( BACKEND_URL + '/restaurants/about/' + email ).then( ( response ) => {
            console.log( response )
            if ( response.status === 200 ) {
                console.log( "got data" )
                let imagePath = BACKEND_URL + "/images/profilepics/" + response.data.profilePicture
                if ( response.data.profilePicture === null ) {
                    console.log( "inside imagepath null" )
                    imagePath = profile_picture
                }
                this.setState( {
                    restaurantID: response.data.restaurantID,
                    name: response.data.name,
                    email: response.data.email,
                    contact: response.data.contact,
                    location: response.data.location,
                    description: response.data.description,
                    timing: response.data.timing,
                    profileImagePath: imagePath,

                } )
            }

        } ).catch( ( err ) => {
            console.log( " error getting restaurant data" )
            this.setState( {
                error: true
            } )

        } );
    }

    //change state to toggle review popup
    toggleReviewPopUp = ( e ) => {
        this.setState( {
            reviewPopUp: !this.state.reviewPopUp
        } )
    }

    //change statetoggle order now popup
    toggleOrderPopUp = ( e ) => {
        this.setState( {
            orderPopUp: !this.state.orderPopUp
        } )
    }

    //function to getDIsh Images and store into Images array to display together
    displayImageStore = ( imageArray ) => {
        this.setState( {
            images: [ ...imageArray ]
        } )
    }

    //function to get dishes and add to orders from -->GetDishes-->IndividualDish
    addToOrderProfile = ( dish ) => {
        this.setState( {
            Orders: [ ...this.state.Orders, dish ]
        } )

    }

    removeFromOrderProfile = ( dishID ) => {
        let newOrders = this.state.Orders.filter( dish => dish.dishID !== dishID )
        console.log( "new orders", newOrders );
        this.setState( {
            Orders: [ ...newOrders ]
        } )
    }

    render () {
        var redirectVar = null;
        if ( !( cookie.load( "auth" ) && cookie.load( "type" ) === "users" ) ) {
            redirectVar = <Redirect to="/login" />
        }

        let displayDishImages = this.state.images.map( ( image ) => {
            var dishImagePath = BACKEND_URL + "/images/dishes/" + image
            return (
                <img src={ dishImagePath } style={ { "margin": "10px" } } width="200px" height="90%" alt="" />
            )
        } )

        return (
            < div >
                { redirectVar }
                <div className="container-fluid m-1" style={ { height: "100vh" } }>
                    <div className="row mt-2 mb-2 ml-5">
                        {/* Back to Dashboard */ }
                        <div className="col-3">
                            <Link className="btn btn-danger" to="/users/dashboard"  >
                                Back to Dashboard
                        </Link>
                        </div>
                        {/* Gove a Review */ }
                        <div className="col-7">
                            <div className="add-review" >
                                <button className="btn btn-danger" onClick={ this.toggleReviewPopUp }>Give a Review</button>
                            </div>

                            <Modal isOpen={ this.state.reviewPopUp } >
                                <AddReview reviewData={ this.state } closePopUp={ this.toggleReviewPopUp } />
                            </Modal>
                        </div>
                        {/* Order Now */ }
                        <div className="col-2">
                            <div className="add-review" >
                                <button className="btn btn-danger" onClick={ this.toggleOrderPopUp }>Order Now</button>
                            </div>

                            <Modal isOpen={ this.state.orderPopUp } >
                                <OrderNow orderData={ this.state } closePopUp={ this.toggleOrderPopUp } />
                            </Modal>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3" style={ { "border-right": "1px solid #e6e6e6", "background": "whitesmoke" } }>
                            <ul style={ { "list-style-type": "none" } }>
                                <li><img src={ this.state.profileImagePath } style={ { "border": "1px solid black" } } width="200px" height="90%" alt="" /></li>
                                <li><h2>{ this.state.name }</h2></li>
                                <li>{ this.state.location }</li>
                                <li>{ this.state.description }</li>

                            </ul>

                            <ul style={ { "list-style-type": "none", "padding-top": '80px' } }>
                                <li><h5>Contact Details:</h5></li>
                                <li><b>Mail at:</b> { this.state.email }</li>
                                <li><b>Call at:</b> { this.state.contact }</li>
                                <li><b>We are OPEN:</b> { this.state.timing }</li>

                            </ul>


                        </div>
                        <div className="col-9" style={ { "padding-left": "40px" } }>
                            <div className="row" style={ { "padding-left": "40px" } }>
                                <h3>Here's What We Offer</h3>
                            </div>
                            <div className="row" style={ { "padding-left": "20px" } }>
                                <div style={ {
                                    "width": "auto",
                                    "overflow": "auto",
                                    "white-space": "nowrap",
                                    "height": "200px"
                                } }>
                                    { displayDishImages }
                                </div>
                            </div>
                            {/* Display dishes */ }
                            <div className="row">
                                <div className="dishes">
                                    <GetDishes removeFromOrder={ this.removeFromOrderProfile } addToOrder={ this.addToOrderProfile } restaurantID={ this.props.match.params.restaurantID } displayDishes={ this.displayImageStore } />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>


            </div >
        )

    }

}

export default RestaurantProfile
