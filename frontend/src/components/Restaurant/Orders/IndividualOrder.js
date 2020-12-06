import React, { Component } from 'react'
import axios from 'axios';
import BACKEND_URL from '../../../config/config';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import profile_picture from '../../../images/profile.png';

export class IndividualOrder extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            detailsPopUp: false,
            userData: {},
            changeStatus: false,
            updatedStatus: "",
        }
    }


    componentDidMount () {

        var userID = this.props.orderData.ref_userID
        axios.get( BACKEND_URL + '/users/aboutbyID/' + userID ).then( response => {
            this.setState( {
                userData: response.data
            } )

        } ).catch( error => {
            console.log( "Erron in fetching restaurant data", error )
        } )
    }


    // to update status by value selected drop down menu
    handleStatusChange = ( e ) => {
        console.log( "status", e.target.value )
        this.setState( {
            updatedStatus: e.target.value
        } )
    }

    // database call on Done to change staus in database
    updateStatusInOrders = () => {
        if ( this.state.updatedStatus === "" ) {
            var data = {
                orderStatus: "Order Received"
            }
        } else {
            var data = {
                orderStatus: this.state.updatedStatus
            }
        }
        var orderID = this.props.orderData.orderID
        console.log( orderID )
        axios.put( BACKEND_URL + '/orders/restaurants/update/' + orderID, data ).then( response => {
            this.toggleChangeStatus()
            console.log( "Updated" )
            this.props.reload( this.state.updatedStatus )
        } ).catch( error => {
            console.log( "Error in updating status: ", error )
        } )

    }
    toggleDetailsPopUp = ( e ) => {
        this.setState( {
            detailsPopUp: !this.state.detailsPopUp
        } )
    }

    // to toggle between dropdown menu and Status
    toggleChangeStatus = ( e ) => {
        this.setState( {
            changeStatus: !this.state.changeStatus
        } )
    }

    displayPicture = ( name ) => {
        if ( name ) {
            var dishImagePath = BACKEND_URL + "/images/profilepics/" + name
        } else {
            var dishImagePath = profile_picture
        }

        return (

            <img src={ dishImagePath } width="200px" height="185px" alt="" />

        )
    }
    render () {
        let updateOrder = null
        let orderStatus = null
        if ( !this.state.changeStatus ) {
            if ( this.props.orderData.cancelled === "Yes" ) {
                updateOrder = <button className="btn btn-primary" >
                    Ordered Cancelled
            </button>

            } else {
                updateOrder = <button className="btn btn-primary" onClick={ this.toggleChangeStatus }>
                    Update Status
            </button>
            }
            if ( this.state.updatedStatus === "" ) {
                orderStatus = this.props.orderData.orderStatus
            } else {
                orderStatus = this.state.updatedStatus
            }
        } else {
            updateOrder = <button className="btn btn-primary" onClick={ this.updateStatusInOrders }>
                Done
            </button>
            if ( this.props.orderData.orderMethod === "Delivery" ) {
                orderStatus = <select defaultValue="Order Received" onChange={ this.handleStatusChange } name="status" id="order">
                    <option value="Order Received" >Order Received</option>
                    <option value="Preparing">Preparing</option>
                    <option value="On The Way">On The Way</option>
                    <option value="Delivered">Delivered</option>

                </select>
            } else if ( this.props.orderData.orderMethod === "Pick Up" ) {
                orderStatus = <select defaultValue="Order Received" onChange={ this.handleStatusChange } name="status" id="order">
                    <option value="Order Received">Order Received</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Pick Up Ready">Pick Up Ready</option>
                    <option value="Picked Up">Picked Up</option>

                </select>
            }
        }
        return (
            <div style={ { "padding-top": "20px" } }>
                <div className="row  m-2" style={ { "width": "100%", "height": "190px", "background": "whitesmoke" } }>
                    <div className="col-4" style={ { "padding": "0px" } }>
                        { this.displayPicture( this.state.userData.profilePicture ) }
                    </div>
                    <div className='col-3'>

                        <ul style={ { "list-style-type": "none", "padding-left": "0px" } }>
                            <li><h2>{ this.state.userData.name }</h2></li>
                            <li>{ this.state.userData.yelpingSince }</li>
                            <li>{ this.state.userData.location }</li>
                            <li>{ this.state.userData.contactNumber }</li>


                        </ul>

                    </div>
                    <div className="col-3" style={ { "padding-right": "0px" } }>
                        <ul style={ { "list-style-type": "none" } }>
                            <li><h6>OrderID:</h6>{ this.props.orderData.orderID }</li>
                            <li><h5>Order Status:</h5></li>
                            <li>
                                { orderStatus }
                            </li>
                            <li>&nbsp;</li>
                            <li><h5>Delivery Type:</h5></li>
                            <li>{ this.props.orderData.orderMethod }</li>

                        </ul>
                    </div>
                    <div className="col-2" style={ { "padding-right": "0px" } }>
                        <div className="row">
                            <Link className="btn btn-primary" to={ `/restaurants/userprofiles/${ this.state.userData.email }/${ this.props.orderData.ref_userID }` } >
                                View Profile
                    </Link>
                        </div>
                        <div className="row mt-2">
                            { updateOrder }
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default IndividualOrder
