const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema;

var reviewSchema = new Schema( {
    userID: String,
    restaurantID: String,
    headline: String,
    reviewText: String,
    date: String,
    ratings: Number,
    restaurantName: String,
    reviewerName: String,

}
    , { collection: 'reviews' }
);

module.exports = mongoose.model( 'reviewSchema', reviewSchema );  