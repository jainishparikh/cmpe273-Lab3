const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema;



var userSchema = new Schema( {
    name: String,
    email: { type: String, unique: true },
    password: String,
    nickName: String,
    contactNumber: String,
    dateOfBirth: String,
    city: String,
    state: String,
    country: String,
    headline: String,
    yelpingSince: String,
    thingsILove: String,
    blogLink: String,
}
    , { collection: 'users' }
);

module.exports = mongoose.model( 'userSchema', userSchema );  