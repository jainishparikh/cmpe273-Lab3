import React, { Component } from 'react'
import { Redirect } from 'react-router';
//import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import axios from 'axios';
import BACKEND_URL from '../../../config/config'

export class AddReview extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            headline: "",
            ratings: "",
            reviewText: "",
            date: "",
        }
    }
    //handle input change
    handleInputChange = inp => {
        // console.log( inp.target.name, inp.target.value );
        this.setState( {
            [ inp.target.name ]: inp.target.value
        } )
    }



    handleOnSubmit = sub => {
        sub.preventDefault()
        var data = {
            userID: cookie.load( 'id' ),
            reviewerName: cookie.load( 'name' ),
            restaurantID: this.props.reviewData.restaurantID,
            restaurantName: this.props.reviewData.name,
            reviewText: this.state.reviewText,
            headline: this.state.headline,
            ratings: this.state.ratings,
            date: this.state.date,
        }
        console.log( "in handleOnsubmit" )
        axios.post( BACKEND_URL + '/reviews/addreview', data ).then( response => {
            if ( response.status === 200 ) {
                console.log( "review added" );
                window.location.assign( '/users/restaurantprofiles/' + this.props.reviewData.email + '/' + this.props.reviewData.restaurantID )
            }
        } ).catch( error => {
            console.log( "Erron in posting review: ", error )
        } )
    }
    render () {
        return (
            <div>
                <form onSubmit={ this.handleOnSubmit }>
                    <div className="row mt-2">
                        <div className="col-6">
                            Headline: <input type="text" className="form-control" name="headline"
                                onChange={ this.handleInputChange } />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Ratings:<input type="text" className="form-control" name="ratings"
                                onChange={ this.handleInputChange } />
                        </div>
                        <div className="col-3">
                            Date:<input type="date" className="form-control" name="date"
                                onChange={ this.handleInputChange } />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            Review: <input type="text" style={ { height: "60px" } } className="form-control" name="reviewText"
                                onChange={ this.handleInputChange } />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-3">
                            <button type="submit" className="btn btn-primary">Submit</button>
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

export default AddReview
