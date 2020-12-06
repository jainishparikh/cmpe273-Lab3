import React, { Component } from 'react'
import cookie from "react-cookies";
import axios from 'axios';
import BACKEND_URL from '../../../config/config';
import IndividualOrder from "./IndividualOrder";
import { Redirect } from 'react-router';

export class Orders extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            Orders: [],
            orderStatusFilter: "All",
            reload: false
        }
    }

    componentDidMount () {
        var restaurantID = cookie.load( 'id' );
        axios.get( BACKEND_URL + '/orders/restaurants/' + restaurantID ).then( response => {
            response.data.map( order => {
                this.setState( {
                    Orders: [ ...this.state.Orders, order ]
                } )
            } )
            console.log( this.state )
        } ).catch( error => {
            console.log( "Error fetching orders for restaurant", error );
        } )
    }

    handleradioChange = ( e ) => {
        console.log( e.target.value )
        this.setState( {
            orderStatusFilter: e.target.value
        } )
    }
    reload = () => {
        window.location.reload()
    }
    render () {
        let redirectVar = null
        if ( !( cookie.load( "auth" ) && cookie.load( "type" ) === "restaurants" ) ) {
            redirectVar = <Redirect to="/login" />
        }
        let filteredOrders = this.state.Orders.filter( order => this.state.orderStatusFilter === "All" || order.orderStatus === this.state.orderStatusFilter )

        let displayOrders = filteredOrders.map( order => {
            return ( <IndividualOrder reload={ this.reload } orderData={ order } /> )
        } )
        return (
            <div>
                { redirectVar }
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8"><h2>Orders:</h2></div>

                </div>
                <div className="row">
                    <div className="col-2">
                        <ul style={ { "list-style-type": "none" } }>
                            <li> <h4>Filters : </h4></li>
                            <li><input type="radio" name="filter" value="All" onChange={ this.handleradioChange } defaultChecked /> All</li>
                            <li> <input type="radio" name="filter" value="Order Received" onChange={ this.handleradioChange } /> New Orders</li>
                            <li>  <input type="radio" name="filter" value="Preparing" onChange={ this.handleradioChange } /> Preparing</li>
                            <li>  <input type="radio" name="filter" value="On The Way" onChange={ this.handleradioChange } /> On The Way</li>
                            <li>  <input type="radio" name="filter" value="Delivered" onChange={ this.handleradioChange } /> Delivered</li>
                            <li>  <input type="radio" name="filter" value="Pick Up Ready" onChange={ this.handleradioChange } /> Pick Up Ready</li>
                            <li>  <input type="radio" name="filter" value="Picked Up" onChange={ this.handleradioChange } /> Picked Up</li>
                            <li>  <input type="radio" name="filter" value="Cancelled" onChange={ this.handleradioChange } /> Cancelled</li>


                        </ul>
                    </div>
                    <div className="col-8">{ displayOrders }</div>
                    <div className="col-2"></div>
                </div>
            </div>
        )
    }
}

export default Orders
