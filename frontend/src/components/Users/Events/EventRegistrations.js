import React, { Component } from 'react'
import cookie from 'react-cookies';
import axios from 'axios';
import BACKEND_URL from '../../../config/config'

export class EventRegistrations extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            eventID: this.props.eventData.eventID,
            eventName: this.props.eventData.eventName,
            eventDescription: this.props.eventData.eventDescription,
            eventTime: this.props.eventData.eventTime,
            eventDate: this.props.eventData.eventDate,
            eventLocation: this.props.eventData.eventLocation,
            Hashtags: this.props.eventData.Hashtags,
            restaurantID: this.props.eventData.ref_restaurantID,
            registered: false
        }
    }
    componentDidMount () {
        var id = cookie.load( 'id' )
        axios.get( BACKEND_URL + '/events/users/' + id ).then( response => {
            console.log( "Got registered events" );
            let exist = response.data.some( event => event.eventID === this.state.eventID )
            if ( exist ) {
                this.setState( {
                    registered: true
                } )
            }


        } ).catch( error => {
            console.log( "Error in getting registered events: ", error )
        } )

    }
    handleRegistration = ( e ) => {
        var data = {
            userID: cookie.load( 'id' ),
            eventID: this.state.eventID,
            userName: cookie.load( 'name' ),
            userEmail: cookie.load( 'email' )
        }
        axios.post( BACKEND_URL + '/events/users/register', data ).then( response => {
            console.log( "Registration Successfull" );
            window.location.assign( '/users/events' )
        } ).catch( error => {
            console.log( "Error in user registration: ", error )
        } )

    }

    render () {
        var register = null
        if ( this.state.registered ) {
            register = <button className="btn btn-primary" >Already Registered</button>
        } else {
            register = <button className="btn btn-primary" onClick={ this.handleRegistration }>Register</button>
        }
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-4"><h6>Name:</h6> { this.props.eventData.eventName }</div>
                        <div className="col-4"><h6>Hashtags:</h6> { this.props.eventData.Hashtags }</div>

                    </div>
                    <div className="row">
                        <div className="col-4"><h6>When:</h6> { this.props.eventData.eventTime }, { this.props.eventData.eventDate }</div>
                        <div className="col-4"></div>

                    </div>
                    <div className="row">
                        <div className="col-4"><h6>Where:</h6> { this.props.eventData.eventLocation }</div>

                    </div>
                    <div className="row">
                        <div className="col-8"><h6>Description:</h6> { this.props.eventData.eventDescription }</div>

                    </div>


                    <div className="row mt-5">
                        <div className="col-3">
                            { register }
                        </div>

                        <div className="col-3">
                            <button className="btn btn-danger" onClick={ this.props.closePopUp }>Back</button>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

export default EventRegistrations
