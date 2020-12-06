var express = require( 'express' );
var bcrypt = require( 'bcrypt' );
var router = express.Router();
var connection = require( '../config/db_config' ).connection;


//signup
router.post( '/signup', ( req, res ) => {

    var name = req.body.name;
    var email = req.body.email
    var password = req.body.password


    bcrypt.hash( password, 10, ( err, hash ) => {
        var sql = `insert into users(name,email,password) values(?,?,?)`;
        var values = [ name, email, hash ];
        connection.query( sql, values, ( err, results, fields ) => {
            if ( err ) {
                console.log( err );
                res.status( 400 ).end( 'Error' )
            } else {
                res.writeHead( 200, {
                    "Content-Type": "text/plain"
                } );
                res.end( "User signup successful" );
            }

        } );


    } );


} );


//login
router.post( '/login', ( req, res ) => {
    var email = req.body.email
    var password = req.body.password
    var type = req.body.type


    var sql = `select userID,name,email,password from ${ type } where email="${ email }"`;

    connection.query( sql, ( err, results ) => {
        if ( err ) {
            console.log( err );
        } else {
            if ( results.length > 0 ) {
                if ( bcrypt.compareSync( password, results[ 0 ].password ) ) {
                    console.log( results[ 0 ] )
                    userdata = {
                        id: results[ 0 ].userID,
                        name: results[ 0 ].name,
                        email: results[ 0 ].email
                    }
                    req.session.user = email;
                    res.status( 200 ).send( JSON.stringify( userdata ) );
                } else {
                    res.status( 400 ).end( "Invalid Credentials" );
                }

            } else {
                res.status( 400 ).end( "User Not found" );
            }
        }
    } );

} );

//About
//get user about by email 
router.get( '/about/:email', ( req, res ) => {
    var email = req.params.email;
    console.log( req.body )
    var sql = `select * from users where email="${ email }"`;
    connection.query( sql, ( err, results ) => {
        if ( err ) {
            console.log( err );
            res.end( "Error:", err );
        } else {
            var data = {}
            console.log( results[ 0 ] )
            Object.keys( results[ 0 ] ).forEach( ( key ) => {
                if ( key != "password" ) {
                    data[ key ] = results[ 0 ][ key ]
                }
            } )
            res.status( 200 ).send( JSON.stringify( data ) );
        }

    } );
} );

//get user about by id 
router.get( '/aboutbyID/:id', ( req, res ) => {
    var id = req.params.id;

    var sql = `select * from users where userID="${ id }"`;
    connection.query( sql, ( err, results ) => {
        if ( err ) {
            console.log( err );
            res.end( "Error:", err );
        } else {
            var data = {}
            console.log( results[ 0 ] )
            Object.keys( results[ 0 ] ).forEach( ( key ) => {
                if ( key != "password" ) {
                    data[ key ] = results[ 0 ][ key ]
                }
            } )
            res.status( 200 ).send( JSON.stringify( data ) );
        }

    } );
} );

//update users about
router.put( '/about', ( req, res ) => {
    var userID = req.body.userID;
    var name = req.body.name;
    var nickName = req.body.nickName;
    var email = req.body.email;
    var contactNumber = req.body.contactNumber;
    var dateOfBirth = req.body.dateOfBirth;
    var city = req.body.city;
    var state = req.body.state;
    var country = req.body.country;
    var headline = req.body.headline;
    var yelpingSince = req.body.yelpingSince;
    var thingsILove = req.body.thingsILove;
    var blogLink = req.body.blogLink;

    console.log( "dob", dateOfBirth )
    var sql = `update users set email=?,name=?,nickName=?,city=?,state=?,country=?,dateOfBirth=?,contactNumber=?,headline=?,yelpingSince=?,thingsILove=?,blogLink=? where userID=${ userID }`;
    var values = [ email, name, nickName, city, state, country, dateOfBirth, contactNumber, headline, yelpingSince, thingsILove, blogLink ]
    connection.query( sql, values, ( err, results ) => {
        if ( err ) {
            console.log( err );
            res.status( 400 ).end( "Error:", err );
        } else {
            res.status( 200 ).send( JSON.stringify( results ) );
        }

    } );
} );


//upload profile pic

router.post( '/uploadpicture', ( req, res ) => {
    let upload = req.app.get( 'upload_profileImage' );
    upload( req, res, err => {
        if ( err ) {
            console.log( "Error uploading image", err );
            res.status( 400 ).end( 'Issue with uploading' )
        } else {
            console.log( "Inside upload", req.file, req.body );
            var userID = req.body.userID;
            var sql = `update users set profilePicture='${ req.file.filename }' where userID=${ userID }`;
            connection.query( sql, ( err, results ) => {
                if ( err ) {
                    console.log( err );
                    res.status( 400 ).end( "Error:", err );
                } else {
                    res.status( 200 ).send( JSON.stringify( results ) );
                }

            } );

        }
    } )
} );

module.exports = router;