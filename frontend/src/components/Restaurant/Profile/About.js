import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import cookie from 'react-cookies';
import Modal from 'react-modal';
import axios from 'axios';
import AddDish from '../Dishes/AddDishes';
import GetDishes from '../Dishes/GetDishes';
import BACKEND_URL from '../../../config/config';
import profile_picture from '../../../images/restaurant.jpeg'

export class RestaurantAbout extends Component {
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
            images: []
        }

    }
    componentDidMount () {
        let email = cookie.load( "email" )
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
                    profileImagePath: imagePath
                } )
            }

        } ).catch( ( err ) => {
            console.log( " error getting restaurant data" )
            this.setState( {
                error: true
            } )

        } );
    }

    toggleDishPopUp = ( e ) => {
        this.setState( {
            dishPopUp: !this.state.dishPopUp
        } )
    }
    displayImageStore = ( imageArray ) => {
        this.setState( {
            images: [ ...imageArray ]
        } )
    }


    render () {
        var redirectVar = null;
        if ( !( cookie.load( "auth" ) && cookie.load( "type" ) === "restaurants" ) ) {
            redirectVar = <Redirect to="/login" />
        }

        let displayDishImages = this.state.images.map( ( image ) => {
            console.log( "images,", image )
            var dishImagePath = BACKEND_URL + "/images/dishes/" + image
            return (
                <img src={ dishImagePath } style={ { "margin": "10px" } } width="200px" height="90%" alt="" />
            )
        } )

        return (
            < div >
                { redirectVar }
                <div className="container-fluid m-1" style={ { height: "100vh" } }>
                    <div className="row h-100">
                        <div className="col-3" style={ { "border-right": "1px solid #e6e6e6", "background": "whitesmoke" } }>
                            <div className="profile-info" style={ { height: "80%" } }>
                                <table style={ { height: "100%" } }>
                                    <tbody>
                                        <div className="restaurant-info" style={ { height: "60%" } }>
                                            <tr> <img src={ this.state.profileImagePath } width="102%" height="100%" alt="" /></tr>
                                            <tr><h2>{ this.state.name }</h2></tr>
                                            <tr>{ this.state.location }</tr>
                                            <tr>{ this.state.description }</tr>
                                        </div>
                                        <div className="rstaurant-contact" style={ { height: "40%" } }>
                                            <tr><h5>Contact Detals:</h5></tr>
                                            <tr>{ this.state.contact }</tr>
                                            <tr>{ this.state.email }</tr>
                                            <tr>{ this.state.timing }</tr>
                                        </div>
                                    </tbody>
                                </table>
                            </div>
                            <div className="profile-edit" style={ { height: "20%" } }>
                                <Link className="btn btn-primary" to={ {
                                    pathname: "/restaurants/editprofile", state: {
                                        userData: this.state
                                    }
                                } }>Edit Profile</Link>
                            </div>
                        </div>
                        <div className="col-9" style={ { "padding-left": "40px" } }>
                            <div className="row">
                                <h3>Here's What We Offer</h3>
                            </div>
                            <div className="row">
                                <div style={ {
                                    "width": "auto",
                                    "overflow": "auto",
                                    "white-space": "nowrap",
                                    "height": "200px"
                                } }>
                                    { displayDishImages }
                                </div>
                            </div>
                            {/* Add dish */ }
                            <div className="row mt-3 mb-3">

                                <div className="add-dish m-2" >
                                    <button className="btn btn-danger" onClick={ this.toggleDishPopUp }>Add Dish</button>
                                </div>
                                {/* using react-modal for popup to add dish */ }
                                <Modal isOpen={ this.state.dishPopUp } style={ {
                                    overlay: {
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(255, 255, 255, 0.25)'
                                    },
                                    content: {
                                        position: 'relative',
                                        top: '20%',
                                        left: '20%',
                                        right: '20%',
                                        bottom: '20%',
                                        border: '2px solid #ccc',
                                        background: '#fff',
                                        overflow: 'auto',
                                        WebkitOverflowScrolling: 'touch',
                                        borderRadius: '4px',
                                        outline: 'none',
                                        padding: '20px'
                                    }
                                } } >
                                    <AddDish call="add" closePopUp={ this.toggleDishPopUp } />
                                </Modal>



                            </div>
                            {/* Display dishes */ }
                            <div className="row" >
                                <div className="dishes">
                                    <GetDishes type='restaurants' displayDishes={ this.displayImageStore } />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>


            </div >
        )

    }

}

export default RestaurantAbout
