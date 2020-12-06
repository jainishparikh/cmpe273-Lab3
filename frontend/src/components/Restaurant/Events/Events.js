import React, { Component } from 'react'
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import axios from 'axios';
import IndividualEvent from './IndividualEvent';
import BACKEND_URL from '../../../config/config';
import Modal from 'react-modal';
import PostEvent from './PostEvent';
export class Events extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            Events: [],
            postEventPopUp: false
        }
    }

    componentDidMount () {
        var restaurantID = cookie.load( 'id' )
        // var restaurantID = 13
        return axios.get( BACKEND_URL + '/events/restaurants/' + restaurantID ).then( response => {
            // response.data.map( ( event ) => {
            //     this.setState( {
            //         Events: [ ...this.state.Events, event ]
            //     } )

            // } )
            this.setState( {
                Events: response.data
            } )
            // console.log( this.state )

        } ).catch( error => {
            console.log( "Error in fetching restaurant events: ", error );
        } )
    }

    togglepostEventPopUp = ( e ) => {
        this.setState( {
            postEventPopUp: !this.state.postEventPopUp
        } )
    }


    render () {
        var redirectVar = null;
        if ( !( cookie.load( "auth" ) && cookie.load( "type" ) === "restaurants" ) ) {
            redirectVar = <Redirect to="/login" />
        }
        let details = this.state.Events.map( ( event, index ) => {
            return (
                <IndividualEvent key={ index } eventData={ event } />
            )
        } )
        return (
            <div>
                { redirectVar }
                <div className="container-fluid m-1" style={ { height: "100vh" } }>
                    <div className="row mt-10" >
                        <div className='col-2'>
                            <div className="row mt-2" style={ { height: "240px" } }> <h2> Events Posted by You </h2></div>
                            <div className="row mt-2" style={ { height: "520px" } }>
                                <div className="post-event m-2" >
                                    <button className="btn btn-danger" onClick={ this.togglepostEventPopUp }>Post Event</button>
                                </div>
                                {/* using react-modal for popup to add dish */ }
                                <Modal isOpen={ this.state.postEventPopUp } style={ {
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
                                    <PostEvent closePopUp={ this.togglepostEventPopUp } />
                                </Modal>

                            </div>
                        </div>
                        <div className='col-10' style={ { height: "20%" } }>{ details }</div>

                    </div>
                </div>

            </div>
        )
    }
}

export default Events
