import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../../../config/config'

export class EventRegistrations extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            Attendees: [],
            eventID: this.props.eventData.eventID,
        }
    }
    componentDidMount () {
        var eventID = this.state.eventID
        axios.get( BACKEND_URL + '/events/attendees/' + eventID ).then( response => {
            response.data.map( ( attendee ) => {
                this.setState( {
                    Attendees: [ ...this.state.Attendees, attendee ]
                } )

            } )
            console.log( this.state )

        } ).catch( error => {
            console.log( "Error getting attendees for an event" )
        } )
    }
    render () {
        let details = this.state.Attendees.map( ( attendee ) => {

            return (
                <tr>
                    <td style={ { "padding": "10px", "border": "1px solid gray" } } >{ attendee.userName }</td>
                    <td style={ { "padding": "10px", "border": "1px solid gray" } }>{ attendee.userEmail }</td>
                    <td style={ { "padding": "10px", "border": "1px solid gray" } }>
                        <Link className="btn btn-primary" to={ `/restaurants/userprofiles/${ attendee.userEmail }/${ attendee.ref_userID }` } >
                            View Profile
                    </Link>
                    </td>
                </tr>
            )
        } )
        return (
            <div>
                <div className="container">
                    <div className="details">
                        <h2>List of Registered People:</h2>
                        <table>
                            <tbody>

                                { details }
                            </tbody>
                        </table>

                    </div>
                    <div className="row mt-5">
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
