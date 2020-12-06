const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema;

var dishesSchema = new Schema( {
    dishID: String,
    dishName: String,
    dishIngrediants: String,
    dishPrice: String,
    dishDescription: String,
    dishCategory: String,
    dishPicture: String,
} )


var restaurantsSchema = new Schema( {
    name: String,
    email: { type: String, unique: true },
    password: String,
    location: String,
    description: String,
    contact: String,
    timing: String,
    restaurantType: String,
    dishes: [ dishesSchema ],

}
    , { collection: 'restaurants' }
);

module.exports = mongoose.model( 'restaurantsSchema', restaurantsSchema );  