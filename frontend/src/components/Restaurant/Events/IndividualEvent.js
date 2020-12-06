import React, { Component } from 'react'
import Modal from 'react-modal';
import EventRegistrations from './EventRegistrations';

export class IndividualEvent extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            eventID: this.props.eventData.eventID,
            eventName: this.props.eventData.eventName,
            eventDescription: this.props.eventData.eventDescription,
            eventTime: this.props.eventData.eventTime,
            eventDate: this.props.eventData.eventDate,
            eventLocation: this.props.eventData.eventLocation,
            Hashtags: this.props.eventData.Hashtags,
            restaurantID: this.props.eventData.ref_restaurantID,
            registartionsPopUp: false,
        }
    }

    toggleRegistrationsPopUp = ( e ) => {
        this.setState( {
            registartionsPopUp: !this.state.registartionsPopUp
        } )
    }

    render () {
        return (
            <div>
                <div className="container pt-5" >
                    <div className="row" style={ { "padding": "10px", "background": "whitesmoke" } }>
                        <div className="col-9">
                            <div className="row">

                                <div className="col-8">
                                    <h2>{ this.state.eventName }</h2>
                                </div>
                                <div className="col-4">
                                    <h6>Time:</h6>
                                    { this.state.eventTime }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8" style={ { "color": "blue" } }>
                                    { this.state.Hashtags }
                                </div>
                                <div className="col-4">
                                    <h6>Date:</h6>
                                    { this.state.eventDate }
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-8">
                                    { this.state.eventDescription }
                                </div>
                                <div className="col-4"></div>

                            </div>
                        </div>
                        <div className="col-3">
                            <div className="post-event m-2" >
                                <button className="btn btn-danger" onClick={ this.toggleRegistrationsPopUp }>View Registrations</button>
                            </div>
                            {/* using react-modal for popup to add dish */ }
                            <Modal isOpen={ this.state.registartionsPopUp } style={ {
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
                                <EventRegistrations eventData={ this.state } closePopUp={ this.toggleRegistrationsPopUp } />
                            </Modal>

                        </div>

                    </div>






                </div>
            </div>
        )
    }
}

export default IndividualEvent
