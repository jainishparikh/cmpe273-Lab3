var express = require( 'express' );
const { route } = require( '../reviews/routes' );
var router = express.Router();
var connection = require( '../config/db_config' ).connection;


//get all events
router.get( '/', ( req, res ) => {

    var sql = `select * from events`
    connection.query( sql, ( err, results, fields ) => {
        if ( err ) {
            console.log( err );
            res.status( 400 ).end( 'Error' )
        } else {
            console.log( "Fetching all events" );
            res.status( 200 ).send( JSON.stringify( results ) );
        }

    } );
} )

//get users by events
router.get( '/attendees/:id', ( req, res ) => {

    var id = req.params.id;

    var sql = `select ref_userID, userName, userEmail from eventsMap where ref_eventID=${ id }`
    connection.query( sql, ( err, results, fields ) => {
        if ( err ) {
            console.log( err );
            res.status( 400 ).end( 'Error' )
        } else {
            console.log( "Fetching usersID for an event " );
            res.status( 200 ).send( JSON.stringify( results ) );
        }

    } );
} )


//get events by restaurants
router.get( '/restaurants/:id', ( req, res ) => {

    var id = req.params.id;

    var sql = `select * from events where ref_restaurantID=${ id }`
    connection.query( sql, ( err, results, fields ) => {
        if ( err ) {
            console.log( err );
            res.status( 400 ).end( 'Error' )
        } else {
            console.log( "Fetching events by restaurants" );
            res.status( 200 ).send( JSON.stringify( results ) );
        }

    } );
} )

//post events by restaurants
router.post( '/restaurants/addEvent', ( req, res ) => {
    var eventName = req.body.eventName;
    var eventDescription = req.body.eventDescription;
    var eventTime = req.body.eventTime;
    var eventDate = req.body.eventDate;
    var eventLocation = req.body.eventLocation;
    var Hashtags = req.body.Hashtags;
    var ref_restaurantID = req.body.restaurantID;

    var sql = `insert into events(eventName, eventDescription, eventTime, eventDate, eventLocation, Hashtags, ref_restaurantID) values(?,?,?,?,?,?,?)`;
    var values = [ eventName, eventDescription, eventTime, eventDate, eventLocation, Hashtags, ref_restaurantID ]
    connection.query( sql, values, ( err, results, fields ) => {
        if ( err ) {
            console.log( err );
            res.status( 400 ).end( 'Error' )
        } else {
            console.log( "Posting events by restaurants" );
            res.status( 200 ).send( JSON.stringify( results ) );
        }

    } );
} )


//register for an event for user
router.post( '/users/register', ( req, res ) => {
    var ref_userID = req.body.userID;
    var ref_eventID = req.body.eventID;
    var userName = req.body.userName;
    var userEmail = req.body.userEmail

    var sql = `insert into eventsMap(ref_userID, ref_eventID, userName, userEmail) values(?,?,?,?)`;
    var values = [ ref_userID, ref_eventID, userName, userEmail ]
    connection.query( sql, values, ( err, results, fields ) => {
        if ( err ) {
            console.log( err );
            res.status( 400 ).end( 'Error' )
        } else {
            console.log( "Registering for an event events by user" );
            res.status( 200 ).send( JSON.stringify( results ) );
        }

    } );
} )


// get all registered events for a user
router.get( '/users/:id', ( req, res ) => {

    var id = req.params.id;

    var sql = `select events.* from eventsMap inner join events on eventsMap.ref_eventID = events.eventID where eventsMap.ref_userID=${ id };`
    connection.query( sql, ( err, results, fields ) => {
        if ( err ) {
            console.log( err );
            res.status( 400 ).end( 'Error' )
        } else {
            console.log( "Fetching registered events for a user" );
            res.status( 200 ).send( JSON.stringify( results ) );
        }

    } );
} )




module.exports = router;