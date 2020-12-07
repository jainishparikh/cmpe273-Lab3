import React, { Component } from 'react'
import OrderDetails from './OrderDetails';
import axios from 'axios';
import BACKEND_URL from '../../../config/config';
import Modal from 'react-modal';
import profile_picture from '../../../images/restaurant.jpeg'
import { graphql, compose, withApollo } from 'react-apollo';
import { Query } from "react-apollo";
import { getRestaurantProfileByID } from '../../../queries/queries'


export class IndividualOrder extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            detailsPopUp: false,
            restaurantData: {},
            cancelled: false
        }
    }

    componentDidMount () {
        var restaurantID = this.props.orderData.restaurantID
        console.log( "orderData", this.props.orderData )
        console.log( "resid", restaurantID )
        this.props.client.query( {
            query: getRestaurantProfileByID,
            variables: {
                restaurantID: restaurantID
            }
        } ).then( response => {
            console.log( "res", response.data.getRestaurantProfileByID )
            this.setState( {
                restaurantData: response.data.getRestaurantProfileByID
            } )
            console.log( this.state )
        } ).catch( e => {
            console.log( "error", e );

        } )
        // return axios.get( BACKEND_URL + '/restaurants/aboutbyID/' + restaurantID ).then( response => {

        //     this.setState( {
        //         restaurantData: response.data
        //     } )
        //     console.log( this.state.restaurantData )

        // } ).catch( error => {
        //     console.log( "Erron in fetching restaurant data", error )
        // } )
    }

    toggleDetailsPopUp = ( e ) => {
        this.setState( {
            detailsPopUp: !this.state.detailsPopUp
        } )
    }

    displayPicture = () => {
        var restaurantImagePath = profile_picture

        return (

            <img src={ restaurantImagePath } width="200px" height="195px" alt="" />

        )
    }
    // cancelOrder = () => {
    //     var orderID = this.props.orderData.orderID
    //     var data = {
    //         orderStatus: 'Cancel'
    //     }
    //     console.log( orderID )
    //     axios.put( BACKEND_URL + '/orders/users/cancel/' + orderID, data ).then( response => {
    //         this.setState( {
    //             cancelled: true
    //         } )
    //         console.log( "Updated and Canceled" )

    //     } ).catch( error => {
    //         console.log( "Error in updating status: ", error )
    //     } )
    // }

    render () {
        let cancel = null;
        // if ( this.props.orderData.cancelled === 'No' ) {

        //     cancel = <button className="btn btn-danger " onClick={ this.cancelOrder }>Cancel Order </button>

        // } else {
        //     cancel = <button className="btn btn-danger " >Order Cancelled </button>
        // }
        let orderTime = this.props.orderData.orderDate.split( '-' )
        let date = orderTime[ 1 ] + '/' + orderTime[ 2 ] + '/' + orderTime[ 0 ]
        let time = orderTime[ 3 ] + ':' + orderTime[ 4 ] + ':' + orderTime[ 5 ]


        return (
            <div style={ { "padding-top": "20px" } }>
                <div className="row  m-2" style={ { "padding": "5px", "width": "100%", "height": "200px", "background": "whitesmoke" } }>
                    <div className="col-3" style={ { "padding": "0px" } }>
                        { this.displayPicture() }
                    </div>
                    <div className='col-3'>

                        <ul style={ { "list-style-type": "none", "padding-left": "0px" } }>
                            <li><h2>{ this.state.restaurantData.name }</h2></li>
                            <li>{ this.state.restaurantData.description }</li>
                            <li>{ this.state.restaurantData.location }</li>
                            <li>{ this.state.restaurantData.contact }</li>


                        </ul>

                    </div>
                    <div className='col-3'>

                        <ul style={ { "list-style-type": "none", "padding": "0px" } }>
                            <li><h6>Placed On:</h6></li>
                            <li><h6>Date:</h6></li>
                            <li>{ date }</li>
                            <li><h6>Time:</h6></li>
                            <li>{ time }</li>

                        </ul>

                    </div>
                    <div className="col-3" style={ { "padding-right": "0px" } }>
                        <ul style={ { "list-style-type": "none" } }>
                            <li><h6>OrderID:</h6>{ this.props.orderData._id }</li>
                            <li><h5>Order Status:</h5></li>
                            <li>{ this.props.orderData.orderStatus }</li>
                            <li>&nbsp;</li>
                            <li><h5>Delivery Type:</h5></li>
                            <li>{ this.props.orderData.orderMethod }</li>

                        </ul>
                    </div>

                </div>
                <div className="row" >
                    <div className="col-3"></div>
                    <div className="col-6"> { cancel }</div>
                    <div className="col-3">  <div className="view-details" >
                        <button className="btn btn-danger btn-block" onClick={ this.toggleDetailsPopUp }>View Details  &rarr; </button>
                    </div>
                        {/* using react-modal for popup to add dish */ }
                        <Modal isOpen={ this.state.detailsPopUp } style={ {
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
                                width: "70%",
                                border: '2px solid #ccc',
                                background: '#fff',
                                overflow: 'auto',
                                WebkitOverflowScrolling: 'touch',
                                borderRadius: '4px',
                                outline: 'none',
                                padding: '20px'
                            }
                        } } >
                            {/* <OrderDetails orderData={ this.props.orderData.orderID } closePopUp={ this.toggleDetailsPopUp } /> */ }
                            <OrderDetails dishes={ this.props.orderData.dishes } closePopUp={ this.toggleDetailsPopUp } />
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

// export default IndividualOrder

export default compose(
    withApollo,
    graphql( getRestaurantProfileByID, { name: "getRestaurantProfileByID" } ),

)( IndividualOrder );