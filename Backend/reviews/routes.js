var express = require( 'express' );
var router = express.Router();
var connection = require( '../config/db_config' ).connection;

//add reviews
router.post( '/addreview', ( req, res ) => {

    var userID = req.body.userID;
    var restaurantID = req.body.restaurantID;
    var reviewText = req.body.reviewText;
    var date = req.body.date;
    var headline = req.body.headline;
    var ratings = req.body.ratings;
    var restaurantName = req.body.restaurantName;
    var reviewerName = req.body.reviewerName;

    var sql = `insert into reviews(FK_reviews_users,FK_reviews_restaurants,reviewText, date, ratings, headline, reviewerName, restaurantName) values(?,?,?,?,?,?,?,?)`;
    var values = [ userID, restaurantID, reviewText, date, ratings, headline, reviewerName, restaurantName ];
    connection.query( sql, values, ( err, results, fields ) => {
        if ( err ) {
            console.log( err );
            res.status( 400 ).end( 'Error' )
        } else {
            res.writeHead( 200, {
                "Content-Type": "text/plain"
            } );
            res.end( "Review successfully added" );
        }

    } );
} )


//get reviews by type
router.get( '/getreviews/:type/:id', ( req, res ) => {

    var type = req.params.type;
    var id = req.params.id;

    if ( type === "users" ) {
        var sql = `select * from reviews where FK_reviews_users=${ id }`
    } else if ( type === "restaurants" ) {
        var sql = `select * from reviews where FK_reviews_restaurants=${ id }`
    }
    connection.query( sql, ( err, results, fields ) => {
        if ( err ) {
            console.log( err );
            res.status( 400 ).end( 'Error' )
        } else {
            res.status( 200 ).send( JSON.stringify( results ) );
        }

    } );
} )

module.exports = router;