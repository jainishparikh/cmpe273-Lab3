import React, { Component } from 'react'
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import axios from 'axios';
import IndividualDish from './IndividualDish';
import BACKEND_URL from '../../../config/config'

export class GetDishes extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            Dishes: [],
            dishPopUp: false
        }
    }
    //handle input change
    handleInputChange = inp => {
        // console.log( inp.target.name, inp.target.value );
        this.setState( {
            [ inp.target.name ]: inp.target.value
        } )
    }

    componentDidMount () {
        var restaurantID = this.props.restaurantID;
        axios.get( BACKEND_URL + "/restaurants/dishes/" + restaurantID ).then( response => {
            if ( response.status === 200 ) {
                let images = []
                response.data.map( ( dish ) => {
                    images.push( dish.dishPicture )
                    this.setState( {
                        Dishes: [ ...this.state.Dishes, dish ]
                    } )

                } )
                this.props.displayDishes( images )
                console.log( "get dishes", this.state )

            }
        } ).catch( err => {
            console.log( "Error in getting dishes" + err );
        } )


    }
    displayPicture = ( name ) => {
        var dishImagePath = BACKEND_URL + "/images/dishes/" + name
        return (

            <img src={ dishImagePath } width="102%" height="100%" alt="" />

        )
    }

    toggleDishPopUp = ( e ) => {
        this.setState( {
            dishPopUp: !this.state.dishPopUp
        } )
    }

    addToOrderGetDishes = ( dish ) => {
        this.props.addToOrder( dish )
    }

    removeFromOrderGetDishes = ( dishID ) => {
        this.props.removeFromOrder( dishID )
    }

    render () {
        var redirectVar = null;
        if ( !cookie.load( "auth" ) ) {
            redirectVar = <Redirect to="/login" />
        }
        let details = this.state.Dishes.map( ( dish ) => {
            return (
                <IndividualDish removeFromOrder={ this.removeFromOrderGetDishes } addToOrder={ this.addToOrderGetDishes } dishData={ dish } />
            )
        } )
        return (
            <div>
                { redirectVar }
                <div className="container">
                    {/* <table>
                        <thead></thead>
                        <tbody> */}
                    { details }
                    {/* </tbody>
                    </table> */}

                </div>

            </div>
        )
    }
}

export default GetDishes
