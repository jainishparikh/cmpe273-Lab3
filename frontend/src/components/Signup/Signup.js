import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BACKEND_URL from '../../config/config';

import yelp_image from '../../images/yelp-login.png'
export class Signup extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            type: '',
            name: '',
            email: '',
            password: '',
            address: '',
            error: false,
            errorMessage: ""
        }
    }

    handlePasswordChange = inp => {
        this.setState( {
            password: inp.target.value
        } )

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


    //handle submit
    handleSubmit = sub => {
        sub.preventDefault();

        console.log( this.state );
        if ( this.state.type === "" ) {
            this.setState( {
                error: true,
                errorMessage: "Please Select User or Restaurant"
            } )
        } else {


            if ( this.state.type === 'users' ) {
                axios
                    .post( BACKEND_URL + '/users/signup', this.state )
                    .then( ( response ) => {
                        if ( response.status === 200 ) {
                            window.location.assign( '/login' )
                        }

                    } )
                    .catch( ( err ) => {
                        this.setState( {
                            error: true
                        } )

                    } );
            } else if ( this.state.type === 'restaurants' ) {
                axios
                    .post( BACKEND_URL + '/restaurants/signup', this.state )
                    .then( ( response ) => {
                        console.log( response )
                        if ( response.status === 200 ) {
                            console.log( "redirecting to login" )
                            window.location.assign( '/login' )
                        }

                    } ).catch( ( err ) => {
                        console.log( "inside restaurant error" )
                        this.setState( {
                            error: true
                        } )

                    } );
            }
        }
    };

    renderError = () => {
        if ( this.state.error ) {
            return (
                <div>
                    <h5>"User with this email already exist"</h5>
                </div>
            )
        }
    }

    render () {
        let renderError = null
        if ( this.state.error ) {
            renderError = <div style={ { 'color': 'red' } }>{ this.state.errorMessage }</div>
        }
        return (
            <div>

                <div className="row" style={ { height: "100vh", "padding": "10%" } }>
                    <div className="col-5" style={ { "paddingLeft": "10%" } }>
                        <div className='row' style={ { "height": "10%" } }></div>
                        <div className='row' style={ { "height": "90%" } }>
                            <div className="col-12">
                                <h4 style={ { "margin": "10px", 'color': 'red' } }>Signup for Yelp</h4>
                                <form onSubmit={ this.handleSubmit } style={ { "margin": "10px" } } id="Signup">
                                    <div className="role" >
                                        <input type="radio" style={ { "margin": "0 5px" } } id='radio-b1' name="type" value='users' onChange={ this.handleInputChange }
                                        />
                                        <label><h5>User</h5></label>
                                        <input type="radio" style={ { "margin": "0 5px" } } id='radio-b2' name="type" value='restaurants' onChange={ this.handleInputChange }
                                        />
                                        <label><h5>Restaurant</h5></label>

                                    </div>

                                    <div className="form-group">
                                        <input type="text" className="form-control" name="name" autoFocus required
                                            placeholder="Enter Name" onChange={ this.handleInputChange } />

                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="email" required
                                            placeholder="Enter Email" onChange={ this.handleEmailChange } />

                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="password" required
                                            placeholder="Enter Password" onChange={ this.handlePasswordChange } />
                                    </div>
                                    <div className="form-group">
                                        { this.state.type === 'restaurants' ? <input type="text" className="form-control" name="address" required
                                            placeholder="Enter location" onChange={ this.handleInputChange } /> : undefined }
                                    </div>
                                    <button type="submit" className="btn btn-danger" onSubmit={ this.handleSubmit }>Sign Up</button>
                                </form>
                                { renderError }
                                <br></br>
                                Already have an account? { <Link style={ { "color": "red" } } to="/login">Login</Link> }
                            </div>
                        </div>
                    </div>
                    <div className="col-7">
                        <div className="row">

                            <div className="row" style={ { "padding": "5%" } }>
                                <img src={ yelp_image } style={ { "paddingLeft": "40%" } } width="100%" height="100%" alt="" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Signup
