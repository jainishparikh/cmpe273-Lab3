import React, { Component } from 'react'
import axios from 'axios';
import BACKEND_URL from '../../../config/config';

export class OrderDetails extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            Dishes: []
        }
    }
    componentDidMount () {
        var orderID = this.props.orderData
        console.log( "orderID", orderID )
        axios.get( BACKEND_URL + '/orders/users/dishes/' + orderID ).then( response => {
            console.log( response )

            let dishData = {
                dishIDs: [ ...response.data ]
            }
            console.log( dishData )
            axios.get( BACKEND_URL + '/orders/dishes/' + JSON.stringify( dishData ) ).then( response => {
                response.data.map( dish => {
                    this.setState( {
                        Dishes: [ ...this.state.Dishes, dish ]
                    } )

                } )
                console.log( this.state )
            } ).catch( error => {
                console.log( "error", error )
            } )

        } ).catch( error => {
            console.log( "Error", error )
        } )

    }

    displayPicture = ( name ) => {
        var dishImagePath = BACKEND_URL + "/images/dishes/" + name
        return (

            <img src={ dishImagePath } width="200px" height="180px" alt="" />

        )
    }

    render () {
        let dishes = this.state.Dishes.map( dish => {
            return (
                <div style={ { "padding": "10px", "margin": "10px", "background": "whitesmoke" } }>
                    <div className="col-4">
                        { this.displayPicture( dish.dishPicture ) }
                    </div>
                    <div className='col-8'>
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
                <div className="row">
                    <div className="col-4">
                        <button className="btn btn-danger" onClick={ this.props.closePopUp }>Back </button>
                    </div>
                    <div className="col-4"><h1>Order Details</h1></div>
                    <div className="col-4"></div>
                </div>

                <div className="row">
                    { dishes }
                </div>

            </div>
        )
    }
}

export default OrderDetails
