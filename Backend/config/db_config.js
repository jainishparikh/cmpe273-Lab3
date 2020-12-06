var mysql = require( 'mysql' )
var mongoose = require( 'mongoose' );
// mongodb+srv://jainishp:cmpe273@cluster0.vcynn.mongodb.net/Yelp?retryWrites=true&w=majority
mongoose.connect( 'mongodb+srv://jainishp:cmpe273@cluster0.vcynn.mongodb.net/YelpG?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useMongoClient: true
}, error => {
    if ( error ) {
        console.log( "Error Connecting to Mongo" );
    } else {
        console.log( "Connection to Database Successfull" );
    }
} )
// var connection = mysql.createConnection( {
//     host: 'cmpe-273-lab1.ctugnikkreqp.us-east-1.rds.amazonaws.com',
//     user: 'cmpe_273',
//     password: 'cmpe_273',
//     database: 'cmpe-273-lab1'
// } )

// var pool = mysql.createPool( {
//     host: 'cmpe-273-lab1.ctugnikkreqp.us-east-1.rds.amazonaws.com',
//     user: 'cmpe_273',
//     password: 'cmpe_273',
//     database: 'cmpe-273-lab1',
//     connectionLimit: 10
// } )

//establishing connecting to database
// connection.connect( ( error ) => {
//     if ( error ) {
//         return console.log( "Connection Failed" );
//     }
//     console.log( "Connection to mysql Successful" );
// } );

module.exports = {
    mongoose
    // connection: pool
}