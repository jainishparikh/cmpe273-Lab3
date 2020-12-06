var express = require( 'express' );
const { route } = require( '../reviews/routes' );
var router = express.Router();
var connection = require( '../config/db_config' ).connection;


//get orders by restaurants
router.get( '/restaurants/:id', ( req, res ) => {
    var restaurantID = req.params.id
    var sql = `select * from orders where ref_restaurantID=${ restaurantID }`
    connection.query( sql, ( err, results, fields ) => {
        if ( err ) {
            console.log( err );
            res.status( 400 ).end( 'Error' )
        } else {
            console.log( "Fetching orders by restaurantID" );
            res.status( 200 ).send( JSON.stringify( results ) );
        }

    } );
} )

//get orders by restaurants
router.get( '/users/:id', ( req, res ) => {
    var userID = req.params.id
    var sql = `select * from orders where ref_userID=${ userID }`
    connection.query( sql, ( err, results, fields ) => {
        if ( err ) {
            console.log( err );
            res.status( 400 ).end( 'Error' )
        } else {
            console.log( "Fetching orders by userID" );
            res.status( 200 ).send( JSON.stringify( results ) );
        }

    } );
} )


//get dishes by order
router.get( '/users/dishes/:id', ( req, res ) => {
    var orderID = req.params.id
    var sql = `select ref_dishID from orderMap where ref_orderID=${ orderID }`
    connection.query( sql, ( err, results, fields ) => {
        if ( err ) {
            console.log( err );
            res.status( 400 ).end( 'Error' )
        } else {
            console.log( "Fetching dishes by userID", results );

            res.status( 200 ).send( JSON.stringify( results ) )
        }

    } );

} )

//get dishes
router.get( '/dishes/:dishData', ( req, res, callBack ) => {
    console.log( "inside dishes", req.params )
    var dishes = JSON.parse( req.params.dishData ).dishIDs;
    var inData = "("
    for ( i = 0; i < dishes.length; i++ ) {
        inData = inData.concat( dishes[ i ].ref_dishID, ',' )
    }
    console.log( 'in data', inData )

    inData = inData.substring( 0, inData.length - 1 );
    console.log( 'in data', inData )

    inData = inData.concat( ')' )
    console.log( 'in data', inData )
    var sql = `select * from dishes where dishID IN ${ inData }`
    connection.query( sql, ( err, results ) => {
        if ( err ) {
            console.log( err );
            res.status( 400 ).end( 'Error' )
        } else {
            res.status( 200 ).send( JSON.stringify( results ) )
        }

    } )

} )

//post order and dishes in orderMap
router.post( '/users/placeOrder/addDishes', ( req, res ) => {
    var orderItems = req.body.OrderItems;
    var orderID = req.body.orderID;

    orderItems.map( dish => {
        var dishID = dish.dishID;
        var sql = `insert into orderMap(ref_orderID, ref_dishID) values(?,?)`;
        var values = [ orderID, dishID ]
        connection.query( sql, values, ( err, results ) => {
            if ( err ) {
                console.log( err );
                res.status( 400 ).end( 'Error' )
            } else {
                console.log( "Posting order by user" );

            }

        } );
    } )
    res.status( 200 ).end( "Dishes added successfullt" )

} )

//post order by user
router.post( '/users/placeOrder', ( req, res ) => {
    var ref_userID = req.body.userID;
    var ref_restaurantID = req.body.restaurantID;
    var orderStatus = req.body.orderStatus;
    var orderMethod = req.body.orderMethod;
    var cancelled = "No";
    let ts = Date.now();

    let date_ob = new Date( ts );
    let date = date_ob.getDate().toString();
    let month = ( date_ob.getMonth() + 1 ).toString();
    let year = date_ob.getFullYear().toString();
    let time = date_ob.getHours().toString() + "-" + date_ob.getMinutes().toString() + "-" + date_ob.getSeconds().toString();
    let orderDate = year + "-" + month + "-" + date + "-" + time;
    var sql = `insert into orders(ref_restaurantID, ref_userID, orderStatus, orderMethod, cancelled, orderDate) values(?,?,?,?,?,?)`;
    var values = [ ref_restaurantID, ref_userID, orderStatus, orderMethod, cancelled, orderDate ]
    connection.query( sql, values, ( err, results, fields ) => {
        if ( err ) {
            console.log( err );
            res.status( 400 ).end( 'Error' )
        } else {
            console.log( "Posting order by user" );
            console.log( "results", results );
            var orderDetails = {
                orderID: results.insertId
            }
            console.log( "orderdetails", orderDetails );
            res.status( 200 ).send( JSON.stringify( orderDetails ) );
        }

    } );
} )

//update order status by restaurant
router.put( '/restaurants/update/:id', ( req, res ) => {
    var orderID = req.params.id
    var orderStatus = req.body.orderStatus;
    console.log( typeof orderStatus )
    var sql = `update orders set orderStatus=? where  orderID=?`;
    var values = [ orderStatus, orderID ]

    connection.query( sql, values, ( err, results, fields ) => {
        if ( err ) {
            console.log( err );
            res.status( 400 ).end( 'Error' )
        } else {
            console.log( "Updating order status" );
            res.status( 200 ).send( JSON.stringify( results ) );
        }

    } );
} )

//update/cancel order status by restaurant
router.put( '/users/cancel/:id', ( req, res ) => {
    var orderID = req.params.id
    var orderStatus = req.body.orderStatus;
    console.log( typeof orderStatus )
    var sql = `update orders set cancelled=? , orderStatus=? where orderID=?`;
    var values = [ "Yes", "Cancelled", orderID ]

    connection.query( sql, values, ( err, results, fields ) => {
        if ( err ) {
            console.log( err );
            res.status( 400 ).end( 'Error' )
        } else {
            console.log( "Updating order status" );
            res.status( 200 ).send( JSON.stringify( results ) );
        }

    } );
} )


module.exports = router