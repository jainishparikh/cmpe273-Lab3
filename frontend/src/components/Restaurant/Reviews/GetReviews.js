import React, { Component } from 'react'
import axios from 'axios'
import BACKEND_URL from '../../../config/config';
import cookie from 'react-cookies';

export class GetReviews extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            Reviews: [],

        }
    }
    componentDidMount () {
        var userID = this.props.userID
        axios.get( BACKEND_URL + '/reviews/getreviews/users/' + userID ).then( response => {
            response.data.map( ( review => {
                this.setState( {
                    Reviews: [ ...this.state.Reviews, review ]
                } )
            } ) )
            console.log( this.state.Reviews )
        } ).catch( error => {
            console.log( "Error in getting reviews: ", error )
        } )
    }
    render () {
        let displayReview = this.state.Reviews.map( review => {
            return (

                <div style={ { "background": "whitesmoke", "padding-left": "10px", "marginTop": "10px" } }>
                    <div className="row">
                        <div className="col-4"><h2>{ review.restaurantName }</h2></div>
                        <div className="col-4">{ review.ratings }</div>
                        <div className="col-4">{ review.date }</div>
                    </div>
                    <div className="row">
                        <div className="col-8"><h4>{ review.headline }</h4></div>

                    </div>
                    <div className="row">

                        <div className="col-8">{ review.reviewText }</div>
                    </div>
                </div>
            )
        } )
        return (
            <div>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-8"><h2>Reviews </h2></div>

                </div>
                { displayReview }
            </div>
        )
    }
}

export default GetReviews
