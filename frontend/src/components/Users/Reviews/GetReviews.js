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
        var userID = cookie.load( 'id' )
        axios.get( BACKEND_URL + '/reviews/getreviews/users/' + userID ).then( response => {
            response.data.map( ( review => {
                this.setState( {
                    Reviews: [ ...this.state.Reviews, review ]
                } )
            } ) )
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
                        <div className="col-6">{ review.ratings }</div>
                        <div className="col-2">{ review.date }</div>
                    </div>
                    <div className="row">
                        <div className="col-8"><h5>Headline:</h5></div>
                        <div className="col-8">{ review.headline }</div>

                    </div>
                    <div className="row">
                        <div className="col-8"><h5>Review:</h5></div>
                        <div className="col-8">{ review.reviewText }</div>
                    </div>
                </div>
            )
        } )
        return (
            <div>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-8"><h2>Reviews by you </h2></div>

                </div>
                { displayReview }
            </div>
        )
    }
}

export default GetReviews
