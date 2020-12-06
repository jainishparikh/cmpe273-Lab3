import React, { Component } from 'react'
import { Redirect } from 'react-router';
//import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import axios from 'axios';
import BACKEND_URL from '../../../config/config'

export class PostEvent extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            eventID: "",
            eventName: "",
            eventTime: "",
            eventDate: "",
            eventDescription: "",
            eventLocation: "",
            hashtags: "",
        }
    }

    //handle input change
    handleInputChange = inp => {
        // console.log( inp.target.name, inp.target.value );
        this.setState( {
            [ inp.target.name ]: inp.target.value
        } )
    }

    handleOnSubmit = sub => {
        sub.preventDefault();
        var eventData = {
            eventName: this.state.eventName,
            eventTime: this.state.eventTime,
            eventDate: this.state.eventDate,
            eventDescription: this.state.eventDescription,
            eventLocation: this.state.eventLocation,
            Hashtags: this.state.hashtags,
            restaurantID: cookie.load( 'id' ),
        }
        axios.post( BACKEND_URL + "/events/restaurants/addEvent", eventData ).then( response => {
            if ( response.status === 200 ) {
                console.log( "Event successfully Posted" + response );

                window.location.assign( "/restaurants/events" )
            }
        } ).catch( err => {
            console.log( "Error in Posting event" );
        } )
    }

    render () {
        var redirectVar = null;
        if ( !cookie.load( "auth" ) ) {
            redirectVar = <Redirect to="/login" />
        }
        return (
            <div>
                { redirectVar }
                <div className="container" >

                    <form onSubmit={ this.handleOnSubmit }>
                        <div className="row mt-2">
                            <h2>Provide Event details below:</h2>

                        </div>
                        <div className="row mt-2">
                            <div className="col-3">
                                Name: <input type="text" className="form-control" name="eventName" required autoFocus
                                    placeholder={ this.state.eventName } onChange={ this.handleInputChange } />
                            </div>
                            <div className="col-3">
                                Hashtags: <input type="text" className="form-control" name="hashtags" required
                                    placeholder={ this.state.Hashtags } onChange={ this.handleInputChange } />
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-3">
                                Time:<input type="text" className="form-control" name="eventTime" required
                                    placeholder={ this.state.eventTime } onChange={ this.handleInputChange } />
                            </div>
                            <div className="col-3">
                                Date:<input type="date" className="form-control" name="eventDate" required
                                    placeholder={ this.state.eventDate } onChange={ this.handleInputChange } />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                Location: <input type="text" className="form-control" name="eventLocation" required
                                    placeholder={ this.state.eventLocation } onChange={ this.handleInputChange } />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                Description: <input type="text" className="form-control" name="eventDescription" required
                                    placeholder={ this.state.eventDescription } onChange={ this.handleInputChange } />
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-3">
                                <button type="submit" className="btn btn-primary">POST</button>
                            </div>
                            <div className="col-3">
                                <button className="btn btn-danger" onClick={ this.props.closePopUp }>Cancel</button>
                            </div>

                        </div>
                    </form>
                </div>


            </div>
        )
    }
}

export default PostEvent
