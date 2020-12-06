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

var orderSchema = new Schema( {
    userID: String,
    restaurantID: String,
    orderStatus: String,
    cancelled: String,
    orderMethod: String,
    orderDate: String,
    dishes: [ dishesSchema ]

}
    , { collection: 'orders' }
);

module.exports = mongoose.model( 'orderSchema', orderSchema );