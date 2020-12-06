const PORT = 3001;

var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var mysql = require( './config/db_config' );
var path = require( 'path' )
var app = express();
// var user = require( './user/routes' )
// var restaurant = require( './restaurant/routes' )
// var reviews = require( './reviews/routes' )
// var events = require( './events/routes' );
// var orders = require( './orders/routes' )
var session = require( "express-session" );
var cookieParser = require( "cookie-parser" );
var multer = require( 'multer' );
var cors = require( 'cors' );
const { graphqlHTTP } = require( 'express-graphql' );
var schema = require( "./schema/schema" )

//Session management

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( express.static( 'public' ) )
app.use( cors( { origin: "http://localhost:3000", credentials: true } ) );
app.use(
    session( {
        key: 'user_sid',
        secret: "cmpe_273_lab1",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 6000000
        }
    } )
);

//image storage
//profile picture
const profileImage_storage = multer.diskStorage( {
    destination: './public/images/profilepics/',
    filename: function ( req, file, cb ) {
        cb(
            null,
            file.fieldname + '_' + Date.now() + path.extname( file.originalname )
        )
    }
} )

const upload_profileImage = multer( {
    storage: profileImage_storage
} ).single( 'myImage' )

app.set( "upload_profileImage", upload_profileImage );

//dish images
const dishImage_storage = multer.diskStorage( {
    destination: './public/images/dishes/',
    filename: function ( req, file, cb ) {
        cb(
            null,
            file.fieldname + '_' + Date.now() + path.extname( file.originalname )
        )
    }
} )

const upload_dishImage = multer( {
    storage: dishImage_storage
} ).single( 'myImage' )

app.set( "upload_dishImage", upload_dishImage );

//APIs

//routes
// app.use( '/users', user );
// app.use( '/restaurants', restaurant );
// app.use( '/reviews', reviews );
// app.use( '/events', events );
// app.use( '/orders', orders );


app.use( "/graphql", graphqlHTTP( {
    schema,
    graphiql: true
} ) );


//get index page
app.get( '/', ( req, res ) => {
    res.send( 'Welcome to yelp' );
} );

//starting the server
app.listen( PORT, () => {
    console.log( "Server listening on port: ", PORT );
} );


