import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import cookie from 'react-cookies';
import axios from 'axios';
import profile_picture from '../../../images/profile.png';
import BACKEND_URL from '../../../config/config';
import GetReviews from '../Reviews/GetReviews';

export class UserProfile extends Component {
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
        let email = this.props.match.params.userEmail
        axios.get( BACKEND_URL + '/users/about/' + email ).then( ( response ) => {
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
            console.log( this.state );

        } ).catch( ( err ) => {
            console.log( " error getting user data" )
            this.setState( {
                error: true
            } )

        } );
    }

    goBackTo = ( e ) => {
        window.history.go( -1 );
    }
    render () {
        var redirectVar = null;
        if ( !( cookie.load( "auth" ) && cookie.load( "type" ) === "restaurants" ) ) {
            redirectVar = <Redirect to="/login" />
        }

        let displayReviews = <div className="col-8" style={ { "padding": "0 15px", "border-left": "1px solid #e6e6e6" } }>
            <GetReviews userID={ this.props.match.params.userID } />

        </div>
        return (
            <div>
                { redirectVar }
                <div className="container-fluid">
                    <div className="container-fluid" style={ { height: "100vh" } }>
                        <div className="row mt-2">
                            {/* <Link className="btn btn-primary" to="/restaurants/events">Back to Events</Link> */ }
                            <button className="btn btn-primary" onClick={ this.goBackTo }>Back</button>
                        </div>
                        <div className="row mt-3 mb-3" style={ { height: "30%", background: "whitesmoke" } }>
                            {/* profile picture */ }
                            <div className="col-2">
                                <img src={ this.state.profileImagePath } width="102%" height="100%" alt="" />
                            </div>
                            {/* profile display */ }
                            <div className="col-8" >
                                <div className="row pt-4">
                                    <div className="col-8">
                                        <table>
                                            <tbody>
                                                <tr></tr>
                                                <tr>
                                                    <td><h2>{ this.state.name }</h2></td>
                                                </tr>
                                                <tr>
                                                    <td><h5>{ this.state.city }, { this.state.state }</h5></td>
                                                </tr>
                                                <tr>&nbsp;</tr>
                                                <tr>&nbsp;</tr>
                                                <tr>
                                                    <td>{ this.state.headline }</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="col-4" style={ { "padding": "0 15px", "border-left": "1px solid #e6e6e6" } }>

                                        <table>
                                            <tbody>
                                                <th>Yelping Since:</th>
                                                <tr>{ this.state.yelpingSince }</tr>
                                                <th>Things I Love:</th>
                                                <tr>{ this.state.thingsILove }&nbsp;</tr>
                                                <th>Blog Link:</th>
                                                <tr>{ this.state.blogLink }&nbsp;</tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>


                        </div>
                        <div className="row">
                            <div className="col-2"></div>
                            { displayReviews }
                        </div>


                    </div>


                </div >
            </div >
        )
    }
}

export default UserProfile
