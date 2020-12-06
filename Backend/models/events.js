const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema;

var users = new Schema( {
    userID: String,
    userEmail: String,
    userName: String
} )

var eventsSchema = new Schema( {
    eventName: String,
    eventDescription: String,
    eventTime: String,
    eventDate: String,
    eventLocation: String,
    Hashtags: String,
    restaurantID: String,
    users: [ users ]

}
    , { collection: 'events' }
);

module.exports = mongoose.model( 'eventsSchema', eventsSchema );  