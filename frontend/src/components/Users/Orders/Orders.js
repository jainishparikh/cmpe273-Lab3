import React, { Component } from 'react';
import axios from 'axios';
import BACKEND_URL from '../../../config/config';
import cookie from 'react-cookies';
import IndividualOrder from './IndividualOrder';
import { Redirect } from 'react-router';

export class Orders extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            Orders: [],
            orderStatusFilter: "All",

        }
    }
    componentDidMount () {
        var userID = cookie.load( 'id' )
        axios.get( BACKEND_URL + '/orders/users/' + userID ).then( response => {
            if ( response.status === 200 ) {
                response.data.map( order => {
                    this.setState( {
                        Orders: [ ...this.state.Orders, order ],

                    } )
                } )
                console.log( "Orders", this.state );

            }
        } ).catch( error => {
            console.log( "Error in fetching orders: ", error );
        } )

    }

    handleradioChange = ( e ) => {
        console.log( e.target.value )
        this.setState( {
            orderStatusFilter: e.target.value
        } )
    }

    render () {
        let redirectVar = null
        if ( !( cookie.load( "auth" ) && cookie.load( "type" ) === "users" ) ) {
            redirectVar = <Redirect to="/login" />
        }

        let filteredOrders = this.state.Orders.filter( order => this.state.orderStatusFilter === "All" || order.orderStatus === this.state.orderStatusFilter )
        // console.log( "filtered", filteredOrders )
        let sortedOrders = filteredOrders.sort( ( a, b ) => b.orderID - a.orderID )
        // console.log( "sorted", sortedOrders )
        let displayOrder = sortedOrders.map( ( order, index ) => {
            console.log( "in orders", order.orderID )
            return (
                <div>
                    <IndividualOrder key={ order.orderID } orderData={ order } />
                </div>
            )
        } )
        return (
            <div>
                { redirectVar }
                <div className="row">
                    {/* <div className="col-2"><h3>Filter By:</h3></div>

                    <div className="col-1"><input type="radio" name="filter" value="All" onChange={ this.handleradioChange } defaultChecked /> All</div>
                    <div className="col-1"><input type="radio" name="filter" value="Order Received" onChange={ this.handleradioChange } /> Order Received</div>
                    <div className="col-1"> <input type="radio" name="filter" value="Preparing" onChange={ this.handleradioChange } /> Preparing</div>
                    <div className="col-1"><input type="radio" name="filter" value="On The Way" onChange={ this.handleradioChange } /> On The Way</div>
                    <div className="col-1"><input type="radio" name="filter" value="Delivered" onChange={ this.handleradioChange } /> Delivered</div>
                    <div className="col-1"><input type="radio" name="filter" value="Pickup Ready" onChange={ this.handleradioChange } /> Pickup Ready</div>
                    <div className="col-1"><input type="radio" name="filter" value="Picked Up" onChange={ this.handleradioChange } /> Picked Up</div> */}

                </div>

                <div className="row p-2" style={ { "padding-top": "20px" } }>
                    <div className="col-2" style={ { "padding-top": "30px" } }>
                        <ul style={ { "list-style-type": "none" } }>
                            <li> <h4>Filters : </h4></li>
                            <li><input type="radio" name="filter" value="All" onChange={ this.handleradioChange } defaultChecked /> All</li>
                            <li> <input type="radio" name="filter" value="Order Received" onChange={ this.handleradioChange } /> Order Received</li>
                            <li>  <input type="radio" name="filter" value="Preparing" onChange={ this.handleradioChange } /> Preparing</li>
                            <li>  <input type="radio" name="filter" value="On The Way" onChange={ this.handleradioChange } /> On The Way</li>
                            <li>  <input type="radio" name="filter" value="Delivered" onChange={ this.handleradioChange } /> Delivered</li>
                            <li>  <input type="radio" name="filter" value="Pick Up Ready" onChange={ this.handleradioChange } /> Pick Up Ready</li>
                            <li>  <input type="radio" name="filter" value="Picked Up" onChange={ this.handleradioChange } /> Picked Up</li>

                        </ul>
                    </div>
                    <div className="col-8">{ displayOrder }</div>
                    <div className="col-2"></div>
                </div>

            </div >
        )
    }
}

export default Orders
