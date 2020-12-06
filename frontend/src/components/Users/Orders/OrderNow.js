import React, { Component } from 'react'
import BACKEND_URL from '../../../config/config'
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

export class OrderNow extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            OrderItems: [ ...this.props.orderData.Orders ],
            deliveryMethod: "Delivery",
            orderPlaced: false,
        }
    }

    //handle input change
    handleInputChange = inp => {
        console.log( inp.target.name, inp.target.value );
        this.setState( {
            [ inp.target.name ]: inp.target.value
        } )
    }

    handleOnSubmit = ( e ) => {
        e.preventDefault()
        var data = {
            userID: cookie.load( 'id' ),
            restaurantID: this.props.orderData.restaurantID,
            orderStatus: 'Order Received',
            orderMethod: this.state.deliveryMethod
        }
        axios.post( BACKEND_URL + '/orders/users/placeOrder', data ).then( response => {
            console.log( "Added order successfullt now adding dishes", response.data );
            var dishData = {
                OrderItems: this.state.OrderItems,
                orderID: response.data.orderID
            }
            axios.post( BACKEND_URL + '/orders/users/placeOrder/addDishes', dishData ).then( response => {
                console.log( "Dishes successfully mapped" );
                this.setState( {
                    orderPlaced: true
                } )
            } ).catch( error => {
                console.log( "Error in mapping dishes in orders:", error )
            } )
        } ).catch( error => {
            console.log( "Error in posting order: ", error )
        } )


    }


    displayPicture = ( name ) => {
        var dishImagePath = BACKEND_URL + "/images/dishes/" + name
        return (

            <img src={ dishImagePath } width="200px" height="180px" alt="" />

        )
    }

    render () {
        let redirectVar = null
        if ( this.state.orderPlaced === true ) {
            redirectVar = <Redirect to="/users/orders" />
        }
        let dishes = this.state.OrderItems.map( dish => {
            return (
                <div>
                    <div className="col-4">
                        { this.displayPicture( dish.dishPicture ) }
                    </div>
                    <div className='col-6'>
                        <div className='row'><h3>{ dish.dishName }</h3></div>
                        <div className='row'><b>Cost: </b>${ dish.dishPrice }</div>
                        <div className='row'><b>Category: </b>{ dish.dishCategory }</div>
                        <div className='row'><b>Ingrediants: </b>{ dish.dishIngrediants }</div>
                        <div className='row'><b>Description: </b>{ dish.dishDescription }</div>
                    </div>
                </div>
            )
        } )
        return (
            <div>
                { redirectVar }
                <div className="row">
                    <div className="col-6"><h2>Your Order Items:</h2></div>
                    <div className="col-6">
                        <label>Choose Delivery Option:</label>
                        <select onChange={ this.handleInputChange } name="deliveryMethod" >
                            <option value="Delivery">Delivery</option>
                            <option value="Pick Up">Pick Up</option>

                        </select>
                    </div>

                </div>
                <form onSubmit={ this.handleOnSubmit }>
                    <div className="row">{ dishes }</div>
                    <div className="row mt-3">
                        <div className="col-3">
                            <button type="submit" className="btn btn-primary">Place Order</button>
                        </div>
                        <div className="col-3">
                            <button className="btn btn-danger" onClick={ this.props.closePopUp }>Cancel</button>
                        </div>

                    </div>
                </form>
            </div>
        )
    }
}

export default OrderNow
