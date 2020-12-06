import React, { Component } from 'react'

export class IndividualDish extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            reviewID: this.props.reviewData.reviewID,
            userID: this.props.reviewData.FK_reviews_users,
            reviewerName: this.props.reviewData.reviewerName,
            restaurantID: this.props.reviewData.FK_reviews_restaurants,
            restaurantName: this.props.reviewData.restaurantName,
            reviewText: this.props.reviewData.reviewText,
            date: this.props.reviewData.date,
            ratings: this.props.reviewData.ratings,
            headline: this.props.reviewData.headline,

        }
    }

    render () {



        return (
            <div style={ { "padding-top": "20px" } }>
                <div style={ { "background": "whitesmoke", "padding-left": "10px" } }>
                    <div className="row">
                        <div className="col-8"><h5>Headline:</h5> { this.props.reviewData.headline }</div>
                        <div className="col-4">{ this.props.reviewData.date }</div>
                    </div>
                    <div className="row">
                        <div className="col-4"><h5>Ratings:</h5> { this.props.reviewData.ratings }</div>


                    </div>
                    <div className="row">
                        <div className="col-8"><h5>Review:</h5>{ this.props.reviewData.reviewText }</div>
                        <div className="col-4"><h6>Author- { this.props.reviewData.reviewerName }</h6></div>
                    </div>

                </div>
            </div>
        )

    }

}


export default IndividualDish

