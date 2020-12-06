import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import axios from 'axios';
import ReactModal from 'react-modal';
import BACKEND_URL from '../../../config/config'


export class Profile extends Component {
    constructor( props ) {
        super( props )
        if ( this.props.location.state ) {
            this.state = {
                userID: this.props.location.state.userData.userID,
                name: this.props.location.state.userData.name,
                nickName: this.props.location.state.userData.nickName,
                email: this.props.location.state.userData.email,
                contactNumber: this.props.location.state.userData.contactNumber,
                dateOfBirth: this.props.location.state.userData.dateOfBirth,
                city: this.props.location.state.userData.city,
                state: this.props.location.state.userData.state,
                country: this.props.location.state.userData.country,
                headline: this.props.location.state.userData.headline,
                yelpingSince: this.props.location.state.userData.yelpingSince,
                thingsILove: this.props.location.state.userData.thingsILove,
                blogLink: this.props.location.state.userData.blogLink,
                profileImageUpdate: false,
                newProfileImage: "",
                profileImagePath: "",
                error: false
            }
        } else {
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
                profileImageUpdate: false,
                newProfileImage: "",
                profileImagePath: "",
                error: false
            }
        }
    }

    handleOtherChange = inp => {
        // console.log( inp.target.name, inp.target.value );
        this.setState( {
            [ inp.target.name ]: inp.target.value
        } )

    }

    //handle input change
    handleInputChange = inp => {
        // console.log( inp.target.name, inp.target.value );
        if ( /[~`!#$@%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test( inp.target.value ) ) {
            this.setState( {
                error: true,
                errorMessage: "Special characters not allowed",
                [ inp.target.name ]: ""
            } )
        } else {
            this.setState( {
                error: false,
                [ inp.target.name ]: inp.target.value
            } )
        }
    }

    handleEmailChange = inp => {
        // console.log( inp.target.name, inp.target.value );
        if ( /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test( inp.target.value ) ) {
            this.setState( {
                error: true,
                errorMessage: "Special characters not allowed",
                [ inp.target.name ]: ""
            } )
        } else {
            this.setState( {
                error: false,
                [ inp.target.name ]: inp.target.value
            } )
        }
    }

    handleOnSubmit = e => {
        e.preventDefault();
        console.log( "in handle submit" )
        if ( !this.state.error ) {
            axios
                .put( BACKEND_URL + "/users/about", this.state ).then( response => {
                    if ( response.status === 200 ) {

                        if ( cookie.load( 'email' ) !== this.state.email ) {
                            cookie.remove( "email", {
                                path: '/'
                            } );
                            cookie.save( "email", this.state.email, {
                                path: '/',
                                httpOnly: false,
                                maxAge: 90000
                            } )
                        }
                        if ( cookie.load( 'name' ) !== this.state.name ) {
                            cookie.remove( "name", {
                                path: '/'
                            } );
                            cookie.save( "name", this.state.name, {
                                path: '/',
                                httpOnly: false,
                                maxAge: 90000
                            } )
                        }
                        window.location.assign( "/users/about" );
                    }

                } ).catch( err => {
                    console.log( "error in updating profile" );
                } )
        }

    }

    //Image Upload toggle
    toggleImageUpdate = ( e ) => {
        this.setState( {
            profileImageUpdate: !this.state.profileImageUpdate
        } )
    }

    //Image Upload
    handleImageUpload = ( e ) => {
        this.setState( {
            newProfileImage: e.target.files[ 0 ]
        } )
    }

    //Image Submit
    handleImageSubmit = ( e ) => {
        e.preventDefault();
        this.toggleImageUpdate();
        console.log( this.state.newProfileImage );
        const formData = new FormData();
        formData.append( 'myImage', this.state.newProfileImage, this.state.newProfileImage.name )
        formData.append( 'userID', this.state.userID )
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios
            .post( BACKEND_URL + '/users/uploadpicture', formData, config ).then( ( response ) => {
                console.log( response.data.filename )
                this.setState( {
                    profileImagePath: BACKEND_URL + "/images/profilepics/" + response.data.filename + ""

                } )
            } ).catch( err => {
                console.log( "Error in image upload: ", err );
            } )

    }



    render () {
        var redirectVar = null;
        if ( !( cookie.load( "auth" ) && cookie.load( "type" ) === "users" ) ) {
            redirectVar = <Redirect to="/login" />
        }
        let renderError = null
        if ( this.state.error ) {
            renderError = <div style={ { 'color': 'red' } }>{ this.state.errorMessage }</div>
        }
        return (
            <div>
                { redirectVar }
                <div className="container-fluid" style={ { height: "100vh" } }>
                    <div className="row h-100 mt-2">
                        <div className="col-2">
                            <div className="row" style={ { height: "40%" } }></div>
                            <div className="row" style={ { height: "60%" } }>
                                <h3>Edit Profile</h3>
                            </div>
                        </div>
                        <div className="col-10">

                            <div className="row ml-3">
                                <button className="btn btn-primary" onClick={ this.toggleImageUpdate }>Change Profile Picture</button>
                                <ReactModal isOpen={ this.state.profileImageUpdate } >
                                    <form onSubmit={ this.handleImageSubmit } encType='multipart/form-data' style={ { textAlign: "Center" } }>
                                        <input type="file" name="newProfileImage" onChange={ this.handleImageUpload } />
                                        <button className="btn btn-primary" type="submit">Done</button>
                                        <button className="btn btn-primary" onClick={ this.toggleImageUpdate }>Cancel</button>
                                    </form>
                                </ReactModal>

                            </div>
                            <form onSubmit={ this.handleOnSubmit }>
                                <div className="row m-1">
                                    <div className="col-5">
                                        <label>Name:</label>
                                        <input type="text" className="form-control" name="name"
                                            placeholder={ this.state.name } onChange={ this.handleInputChange } />


                                    </div>
                                    <div className="col-5">
                                        <label>Nick Name:</label>
                                        <input type="text" className="form-control" name="nickName"
                                            placeholder={ this.state.nickName } onChange={ this.handleOtherChange } />

                                    </div>
                                </div>

                                <div className="row m-1">
                                    <div className="col-10">
                                        <label>Email:</label>
                                        <input type="text" className="form-control" name="email"
                                            placeholder={ this.state.email } onChange={ this.handleEmailChange } />
                                    </div>

                                </div>
                                <div className="row m-1">
                                    <div className="col-5">
                                        <label>Contact Number:</label>
                                        <input type="text" className="form-control" name="contactNumber"
                                            placeholder={ this.state.contactNumber } onChange={ this.handleInputChange } />


                                    </div>
                                    <div className="col-5">
                                        <label>Date Of Birth: (YYYY-MM-DD)</label>
                                        <input type="date" className="form-control" name="dateOfBirth"
                                            placeholder={ this.state.dateOfBirth } onChange={ this.handleOtherChange } />
                                    </div>
                                </div>
                                <div className="row m-1">
                                    <div className="col-3">
                                        <label>City:</label>
                                        <input type="text" className="form-control" name="city"
                                            placeholder={ this.state.city } onChange={ this.handleInputChange } />


                                    </div>
                                    <div className="col-3">
                                        <label>State:</label>
                                        <input type="text" className="form-control" name="state"
                                            placeholder={ this.state.state } onChange={ this.handleInputChange } />

                                    </div>
                                    <div className="col-3">
                                        <label>Country:</label>
                                        <input type="text" className="form-control" name="country"
                                            placeholder={ this.state.country } onChange={ this.handleInputChange } />


                                    </div>
                                </div>
                                <div className="row m-1">
                                    <div className="col-10">
                                        <label>Headline:</label>
                                        <input type="text" className="form-control" name="headline"
                                            placeholder={ this.state.headline } onChange={ this.handleOtherChange } />
                                    </div>

                                </div>
                                <div className="row m-1">
                                    <div className="col-10">
                                        <label>Things I Love:</label>
                                        <input type="text" className="form-control" name="thingsILove"
                                            placeholder={ this.state.thingsILove } onChange={ this.handleOtherChange } />
                                    </div>

                                </div>
                                <div className="row m-1">
                                    <div className="col-10">
                                        <label>Yelping Since:</label>
                                        <input type="text" className="form-control" name="yelpingSince"
                                            placeholder={ this.state.yelpingSince } onChange={ this.handleInputChange } />
                                    </div>

                                </div>
                                <div className="row m-1">
                                    <div className="col-10">
                                        <label>Blog Link:</label>
                                        <input type="text" className="form-control" name="blogLink"
                                            placeholder={ this.state.blogLink } onChange={ this.handleOtherChange } />
                                    </div>

                                </div>
                                <div className="row mt-3 ml-1">
                                    <div className="col-2">
                                        <button type="submit" className="btn btn-primary">Update</button>
                                    </div>
                                    <div className="col-8">
                                        <Link className="btn btn-danger" to="/users/about">Cancel</Link>
                                    </div>

                                </div>
                            </form>
                            { renderError }
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}

export default Profile
