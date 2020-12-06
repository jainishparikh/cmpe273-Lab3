var chai = require( 'chai' ), chaiHttp = require( 'chai-http' );

chai.use( chaiHttp );

var expect = chai.expect;

it( "Login API should check credentials and return status code if correct credentials", function ( done ) {
    chai.request( 'http://127.0.0.1:3001' )
        .post( '/users/login' )
        .send( { "email": "user2@gmail.com", "password": "user2@123", "type": "users" } )
        .end( function ( err, res ) {
            expect( res ).to.have.status( 200 );
            done();
        } );
} )

it( "Should get about data of the restaurant", function ( done ) {
    chai.request( 'http://127.0.0.1:3001' )
        .get( '/restaurants/about/res2@gmail.com' )
        .send( {} )
        .end( function ( err, res ) {
            expect( res ).to.have.status( 200 );
            done();
        } );
} )

it( "should post an event by a restaurant", function ( done ) {
    chai.request( 'http://127.0.0.1:3001' )
        .post( '/events/restaurants/addEvent' )
        .send( { "eventName": "Food Fair", "eventDescription": "Biggest Food Fair", "eventTime": "8:00 AM to 12:00 PM", "eventDate": "2020-11-10", "eventLocation": "San Jose", "Hashtags": "#Food#Fair", "restaurantID": "13" } )
        .end( function ( err, res ) {
            expect( res ).to.have.status( 200 );
            done();
        } );
} )

it( "should change the order status", function ( done ) {
    chai.request( 'http://127.0.0.1:3001' )
        .put( '/orders/restaurants/update/15' )
        .send( { "orderStatus": "Delivered" } )
        .end( function ( err, res ) {
            expect( res ).to.have.status( 200 );
            done();
        } );
} )


it( "should cancel the order by customer", function ( done ) {
    chai.request( 'http://127.0.0.1:3001' )
        .put( '/orders/users/cancel/15' )
        .send()
        .end( function ( err, res ) {
            expect( res ).to.have.status( 200 );
            done();
        } );
} )