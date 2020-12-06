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
            registrationsPopUp: false,
        }
    }

    toggleRegistrationsPopUp = ( e ) => {
        this.setState( {
            registrationsPopUp: !this.state.registrationsPopUp
        } )
    }


    render () {

        return (
            <div>
                <div className="container pt-2 pb-2" >
                    <div className="row" style={ { "background": "whitesmoke" } }>
                        <div className="col-10">
                            <div className="row">

                                <div className="col-8">
                                    <h2>{ this.props.eventData.eventName }</h2>
                                </div>
                                <div className="col-4">
                                    <h6>Time:</h6>
                                    { this.props.eventData.eventTime }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8" style={ { "color": "blue" } }>
                                    { this.props.eventData.Hashtags }
                                </div>
                                <div className="col-4">
                                    <h6>Date:</h6>
                                    { this.props.eventData.eventDate }
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-8">
                                    { this.props.eventData.eventDescription }
                                </div>
                                <div className="col-4"></div>

                            </div>
                        </div>
                        <div className="col-2">
                            <div className="post-event m-2" >
                                <button className="btn btn-danger" onClick={ this.toggleRegistrationsPopUp }>Register</button>
                            </div>
                            {/* using react-modal for popup to add dish */ }
                            <Modal isOpen={ this.state.registrationsPopUp } style={ {
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
                                <EventRegistrations eventData={ this.props.eventData } closePopUp={ this.toggleRegistrationsPopUp } />
                            </Modal>

                        </div>

                    </div>

                </div>
            </div>
        )
    }
}
export default IndividualEvent