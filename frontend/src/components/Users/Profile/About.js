import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import cookie from 'react-cookies';
import axios from 'axios';
import profile_picture from '../../../images/profile.png';
import BACKEND_URL from '../../../config/config';
import GetReviews from '../Reviews/GetReviews';

export class UserAbout extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            userID: "",
            name: "",
            nickName: "",
            email: "",
            contactNumber: "",
            dateOfBirth: "",
            city: "",
            state: "",
            country: "",
            headline: "",
            yelpingSince: "",
            thingsILove: "",
            blogLink: "",
            profileImagePath: profile_picture,
        }

    }
    componentDidMount () {
        let email = cookie.load( "email" )
        // let email = "user2@gmail.com"
        return axios.get( BACKEND_URL + '/users/about/' + email ).then( ( response ) => {
            // console.log( response )
            if ( response.status === 200 ) {
                console.log( "got data" )
                let imagePath = BACKEND_URL + "/images/profilepics/" + response.data.profilePicture
                if ( response.data.profilePicture === null ) {
                    console.log( "inside imagepath null" )
                    imagePath = profile_picture
                }
                this.setState( {
                    userID: response.data.userID,
                    name: response.data.name,
                    nickName: response.data.nickName,
                    email: response.data.email,
                    contactNumber: response.data.contactNumber,
                    dateOfBirth: response.data.dateOfBirth,
                    city: response.data.city,
                    state: response.data.state,
                    country: response.data.country,
                    headline: response.data.headline,
                    yelpingSince: response.data.yelpingSince,
                    thingsILove: response.data.thingsILove,
                    blogLink: response.data.blogLink,
                    profileImagePath: imagePath
                } )
            }
            // console.log( this.state );

        } ).catch( ( err ) => {
            console.log( " error getting user data", err )
            this.setState( {
                error: true
            } )

        } );
    }



    render () {
        var redirectVar = null;
        if ( !( cookie.load( "auth" ) && cookie.load( "type" ) === "users" ) ) {
            redirectVar = <Redirect to="/login" />
        }

        return (

            < div >
                { redirectVar }
                <div className="container-fluid">
                    <div className="container-fluid" style={ { height: "100vh" } }>
                        <div className="row mt-3 mb-3" style={ { height: "35%" } }>
                            {/* profile picture */ }
                            <div className="col-2">
                                <img src={ this.state.profileImagePath } width="100%" height="90%" alt="" />
                            </div>
                            {/* profile display */ }
                            <div className="col-8" >
                                <div className="row pt-4" style={ { background: "whitesmoke" } }>
                                    <div className="col-8">
                                        <ul style={ { "list-style-type": "none" } }>
                                            <li><h2>{ this.state.name }</h2></li>
                                            <li>&nbsp;</li>
                                            <li><h5>{ this.state.city }, { this.state.state }</h5></li>
                                            <li>{ this.state.email }&nbsp;</li>
                                            <li>&nbsp;</li>
                                            <li>&nbsp;</li>
                                            <li>{ this.state.headline }&nbsp;</li>
                                        </ul>

                                    </div>

                                    <div className="col-4" style={ { "padding": "0 15px", "border-left": "1px solid #e6e6e6" } }>
                                        <ul style={ { "list-style-type": "none" } }>
                                            <li><h5>Yelping Since:</h5></li>
                                            <li>{ this.state.yelpingSince }&nbsp;</li>
                                            <li>&nbsp;</li>
                                            <li><h5>Things I Love:</h5></li>
                                            <li>{ this.state.thingsILove }&nbsp;</li>
                                            <li>&nbsp;</li>
                                            <li><h5>Blog Link:</h5></li>
                                            <li>{ this.state.blogLink }&nbsp;</li>
                                        </ul>

                                    </div>
                                </div>

                            </div>


                        </div>

                        <div className="row" style={ { height: "60%" } }>
                            {/* edit-profile */ }
                            <div className="col-2" style={ { "marginTop": "20px" } } >
                                <Link className="btn btn-primary" to={ {
                                    pathname: "/users/editprofile", state: {
                                        userData: this.state
                                    }
                                } }>

                                    Edit Profile
                                </Link>
                            </div>
                            {/* reviews */ }
                            <div className="col-8" style={ { "padding": "0 15px", "border-left": "1px solid #e6e6e6" } }>
                                <GetReviews reviewData={ this.state } />

                            </div>


                        </div>
                    </div>


                </div >
            </div >
        )
    }

}

export default UserAbout
