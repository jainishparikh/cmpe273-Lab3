const graphql = require( 'graphql' );
const _ = require( 'lodash' );
var users = require( '../models/users' )
var restaurants = require( '../models/restaurants' )
var orders = require( '../models/order' )
var reviews = require( '../models/review' )
var bcrypt = require( 'bcrypt' );

const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;


//schema types

const userType = new GraphQLObjectType( {
    name: 'user',
    fields: () => ( {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        nickName: { type: GraphQLString },
        contactNumber: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        headline: { type: GraphQLString },
        yelpingSince: { type: GraphQLString },
        thingsILove: { type: GraphQLString },
        blogLink: { type: GraphQLString },
    } )
} );

var dishesType = new GraphQLObjectType( {
    name: 'dishes',
    fields: () => ( {
        dishID: { type: GraphQLString },
        dishName: { type: GraphQLString },
        dishIngrediants: { type: GraphQLString },
        dishPrice: { type: GraphQLString },
        dishDescription: { type: GraphQLString },
        dishCategory: { type: GraphQLString },
    } )
} )

var dishesInputType = new GraphQLInputObjectType( {
    name: 'dishesInput',
    fields: () => ( {
        dishID: { type: GraphQLString },
        dishName: { type: GraphQLString },
        dishIngrediants: { type: GraphQLString },
        dishPrice: { type: GraphQLString },
        dishDescription: { type: GraphQLString },
        dishCategory: { type: GraphQLString },
    } )
} )

const restauranttype = new GraphQLObjectType( {
    name: 'restaurant',
    fields: () => ( {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        location: { type: GraphQLString },
        contact: { type: GraphQLString },
        description: { type: GraphQLString },
        contact: { type: GraphQLString },
        timing: { type: GraphQLString },
        restaurantType: { type: GraphQLString },
        dishes: {
            type: new GraphQLList( dishesType ),
        }
    } )
} );

var reviewType = new GraphQLObjectType( {
    name: 'review',
    fields: () => ( {
        userID: { type: GraphQLString },
        restaurantID: { type: GraphQLString },
        headline: { type: GraphQLString },
        reviewText: { type: GraphQLString },
        date: { type: GraphQLString },
        ratings: { type: graphql.GraphQLFloat },
        restaurantName: { type: GraphQLString },
        reviewerName: { type: GraphQLString },

    } )
} )

var orderType = new GraphQLObjectType( {
    name: 'order',
    fields: () => ( {
        _id: { type: GraphQLID },
        userID: { type: GraphQLString },
        restaurantID: { type: GraphQLString },
        orderStatus: { type: GraphQLString },
        cancelled: { type: GraphQLString },
        orderMethod: { type: GraphQLString },
        orderDate: { type: GraphQLString },
        dishes: {
            type: new GraphQLList( dishesType ),
        }


    } )
} )

const RootQuery = new GraphQLObjectType( {
    name: 'RootQueryType',
    fields: {
        //users---------------------------------------------------------------------
        //user login
        userLogin: {
            type: userType,
            args: {
                email: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                }
            },
            resolve ( parent, args ) {
                console.log( "In user login " + args.email )
                return users.findOne( { "email": args.email } ).then( doc => {
                    if ( bcrypt.compareSync( args.password, doc.password ) ) {
                        let payload = {
                            _id: doc._id,
                            type: "users",
                            email: doc.email,
                            name: doc.name
                        }
                        return payload
                    } else {
                        console.log( "invalid credentials" )
                    }
                    return doc
                } ).catch( error => {
                    console.log( "error", error )
                    return error

                } )
            }
        },
        //get user profile by email
        getUserProfile: {
            type: userType,
            args: {
                email: {
                    type: GraphQLString
                }
            },
            resolve ( parent, args ) {
                console.log( "In fetch owner profile " + args.email )
                return users.findOne( { "email": args.email } ).then( doc => {

                    return doc
                } ).catch( error => {
                    console.log( "error", error )
                    return error

                } )
            }
        },
        //get user profile by id
        getUserProfileByID: {
            type: userType,
            args: {
                userID: {
                    type: GraphQLString
                }
            },
            resolve ( parent, args ) {
                console.log( "In fetch owner profile by ID" + args.userID )
                return users.findById( { "_id": args.userID } ).then( doc => {
                    return doc
                } ).catch( error => {
                    console.log( "error", error )
                    return error

                } )
            }
        },

        //restuarnts---------------------------------------------------------------------
        restaurantLogin: {
            type: restauranttype,
            args: {
                email: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                }
            },
            resolve ( parent, args ) {
                console.log( "In user login " + args.email )
                return restaurants.findOne( { "email": args.email } ).then( doc => {
                    if ( bcrypt.compareSync( args.password, doc.password ) ) {
                        let payload = {
                            _id: doc._id,
                            type: "restaurant",
                            email: doc.email,
                            name: doc.name
                        }
                        return payload
                    } else {
                        console.log( "invalid credentials" )
                    }
                    return doc
                } ).catch( error => {
                    console.log( "error", error )
                    return error

                } )
            }
        },
        //get all restaurants
        getAllRestaurants: {
            type: new GraphQLList( restauranttype ),
            resolve ( parent, args ) {
                return restaurants.find().then( doc => {
                    return doc
                } ).catch( error => {
                    console.log( "error", error )
                    return error

                } )
            }
        },
        //get restaurant profile by email
        getRestaurantProfile: {
            type: restauranttype,
            args: {
                email: {
                    type: GraphQLString
                }
            },
            resolve ( parent, args ) {
                console.log( "In fetch owner profile " + args.email )
                return restaurants.findOne( { "email": args.email } ).then( doc => {

                    return doc
                } ).catch( error => {
                    console.log( "error", error )
                    return error

                } )
            }
        },
        //get restaurant profile by id
        getRestaurantProfileByID: {
            type: restauranttype,
            args: {
                restaurantID: {
                    type: GraphQLString
                }
            },
            resolve ( parent, args ) {
                console.log( "In fetch restaurant profile by ID" + args.restaurantID )
                return restaurants.findById( { "_id": args.restaurantID } ).then( doc => {
                    return doc
                } ).catch( error => {
                    console.log( "error", error )
                    return error

                } )
            }
        },

        //review----------------------------------
        //get review by restaurant id
        getReviewByRestaurantID: {
            type: new GraphQLList( reviewType ),
            args: {
                restaurantID: {
                    type: GraphQLString
                }
            },
            resolve ( parent, args ) {
                return reviews.find( { restaurantID: args.restaurantID } ).then( doc => {
                    console.log( "reviews by res", doc )
                    return doc
                } ).catch( error => {
                    console.log( "error", error )
                    return error

                } )
            }
        },
        //get review by userID
        getReviewByUserID: {
            type: new GraphQLList( reviewType ),
            args: {
                userID: {
                    type: GraphQLString
                }
            },
            resolve ( parent, args ) {
                return reviews.find( { userID: args.userID } ).then( doc => {
                    return doc
                } ).catch( error => {
                    console.log( "error", error )
                    return error

                } )
            }
        },
        //orders----------------------------------
        //get orders by restaurant id
        getOrdersByRestaurantID: {
            type: new GraphQLList( orderType ),
            args: {
                restaurantID: {
                    type: GraphQLString
                }
            },
            resolve ( parent, args ) {
                return orders.find( { restaurantID: args.restaurantID } ).then( doc => {
                    console.log( "orders by res", doc )
                    return doc
                } ).catch( error => {
                    console.log( "error", error )
                    return error

                } )
            }
        },
        //get orders by userID
        getOrdersByUserID: {
            type: new GraphQLList( orderType ),
            args: {
                userID: {
                    type: GraphQLString
                }
            },
            resolve ( parent, args ) {
                return orders.find( { userID: args.userID } ).then( doc => {
                    return doc
                } ).catch( error => {
                    console.log( "error", error )
                    return error

                } )
            }
        },

    }

} )

const Mutation = new GraphQLObjectType( {
    name: 'Mutation',
    fields: {
        //users---------------------------------------------------------------------

        userSignUp: {
            type: userType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve ( parent, args ) {
                return bcrypt.hash( args.password, 10 ).then( ( hash ) => {

                    let user = new users( {
                        name: args.name,
                        email: args.email,
                        password: hash,
                        nickName: "",
                        contactNumber: "",
                        dateOfBirth: "",
                        city: "",
                        state: "",
                        country: "",
                        headline: "",
                        yelpingSince: "",
                        thingsILove: "",
                        blogLink: "",

                    } )

                    return user.save().then( doc => {
                        console.log( "Signup successfull", doc )
                        return doc
                    } ).catch( error => {
                        console.log( "Error", error )
                        return error
                    } )

                } ).catch( error => {
                    console.log( "bcrypt error", error )
                    return error
                } )
            }
        },
        //update user profile
        updateUserProfile: {
            type: userType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                nickName: { type: GraphQLString },
                contactNumber: { type: GraphQLString },
                dateOfBirth: { type: GraphQLString },
                city: { type: GraphQLString },
                state: { type: GraphQLString },
                country: { type: GraphQLString },
                headline: { type: GraphQLString },
                yelpingSince: { type: GraphQLString },
                thingsILove: { type: GraphQLString },
                blogLink: { type: GraphQLString },
            },
            resolve ( parent, args ) {

                return users.findOneAndUpdate( { email: args.email },
                    {
                        $set: {
                            name: args.name,
                            email: args.email,
                            nickName: args.nickName,
                            contactNumber: args.contactNumber,
                            dateOfBirth: args.dateOfBirth,
                            city: args.city,
                            state: args.state,
                            country: args.country,
                            headline: args.headline,
                            yelpingSince: args.yelpingSince,
                            thingsILove: args.thingsILove,
                            blogLink: args.blogLink
                        }
                    }, { new: true }
                ).then( response => {
                    console.log( "Update successfull" )
                    return response
                } ).catch( error => {
                    console.log( "Error in update", error )
                    return error
                } )


            }
        },

        //restuarnts---------------------------------------------------------------------

        //restaurant signup
        restaurantSignUp: {
            type: restauranttype,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                location: { type: GraphQLString }

            },
            resolve ( parent, args ) {
                return bcrypt.hash( args.password, 10 ).then( ( hash ) => {

                    let restaurant = new restaurants( {
                        name: args.name,
                        email: args.email,
                        password: hash,
                        location: args.location,
                        description: "",
                        contact: "",
                        timing: "",
                        restaurantType: "",
                        dishes: [],

                    } )

                    return restaurant.save().then( doc => {
                        console.log( "Signup successfull", doc )
                        return doc
                    } ).catch( error => {
                        console.log( "Error", error )
                        return error
                    } )

                } ).catch( error => {
                    console.log( "bcrypt error", error )
                    return error
                } )
            }
        },
        //update restaurant profile
        updateRestaurantProfile: {
            type: restauranttype,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                location: { type: GraphQLString },
                contact: { type: GraphQLString },
                description: { type: GraphQLString },
                contact: { type: GraphQLString },
                timing: { type: GraphQLString },
            },
            resolve ( parent, args ) {

                return restaurants.findOneAndUpdate( { email: args.email },
                    {
                        $set: {
                            name: args.name,
                            email: args.email,
                            location: args.location,
                            contact: args.contact,
                            description: args.description,
                            timing: args.timing,
                            restaurantType: "All",
                        }
                    }, { new: true }
                ).then( response => {
                    console.log( "Update successfull" )
                    return response
                } ).catch( error => {
                    console.log( "Error in update", error )
                    return error
                } )


            }
        },
        //add dish
        addDish: {
            type: restauranttype,
            args: {
                restaurantID: { type: GraphQLString },
                dishName: { type: GraphQLString },
                dishIngrediants: { type: GraphQLString },
                dishPrice: { type: GraphQLString },
                dishDescription: { type: GraphQLString },
                dishCategory: { type: GraphQLString },
            },
            resolve ( parent, args ) {
                var dish = {
                    dishID: Date.now(),
                    dishName: args.dishName,
                    dishPrice: args.dishPrice,
                    dishIngrediants: args.dishIngrediants,
                    dishDescription: args.dishDescription,
                    dishCategory: args.dishCategory,
                }
                return restaurants.findByIdAndUpdate( { _id: args.restaurantID }
                    , { $push: { dishes: dish } }, { new: true }
                ).then( doc => {
                    console.log( "Dish added" )
                    return doc
                } ).catch( error => {
                    console.log( "error", error );
                    return error
                } )


            }
        },
        //edit dish
        editDish: {
            type: restauranttype,
            args: {
                restaurantID: { type: GraphQLString },
                dishID: { type: GraphQLString },
                dishName: { type: GraphQLString },
                dishIngrediants: { type: GraphQLString },
                dishPrice: { type: GraphQLString },
                dishDescription: { type: GraphQLString },
                dishCategory: { type: GraphQLString },
            },
            resolve ( parent, args ) {
                var updatedDish = {
                    dishID: args.dishID,
                    dishName: args.dishName,
                    dishPrice: args.dishPrice,
                    dishIngrediants: args.dishIngrediants,
                    dishDescription: args.dishDescription,
                    dishCategory: args.dishCategory,
                }
                return restaurants.findOneAndUpdate(
                    { _id: args.restaurantID, "dishes.dishID": args.dishID }
                    , { $set: { "dishes.$": updatedDish } }, { new: true }


                ).then( doc => {
                    return doc

                } ).catch( error => {
                    console.log( "Restuarant Not found", error );
                    return error
                } )


            }
        },
        //reviews----------------------------
        //add review
        addReview: {
            type: reviewType,
            args: {
                userID: { type: GraphQLString },
                restaurantID: { type: GraphQLString },
                headline: { type: GraphQLString },
                reviewText: { type: GraphQLString },
                date: { type: GraphQLString },
                ratings: { type: graphql.GraphQLFloat },
                restaurantName: { type: GraphQLString },
                reviewerName: { type: GraphQLString },
            },
            resolve ( parent, args ) {
                var review = new reviews( {
                    userID: args.userID,
                    restaurantID: args.restaurantID,
                    headline: args.headline,
                    reviewText: args.reviewText,
                    date: args.date,
                    ratings: args.ratings,
                    restaurantName: args.restaurantName,
                    reviewerName: args.reviewerName,
                } )
                return review.save().then( response => {
                    // console.log( "review added", response )
                    return response

                } ).catch( error => {
                    console.log( "error adding review", error )
                    return error
                } )


            }
        },
        //place order
        placeOrder: {
            type: orderType,
            args: {
                userID: { type: GraphQLString },
                restaurantID: { type: GraphQLString },
                orderStatus: { type: GraphQLString },
                orderMethod: { type: GraphQLString },
                dishes: {
                    type: new GraphQLList( dishesInputType ),
                }
            },
            resolve ( parent, args ) {
                let ts = Date.now();

                let date_ob = new Date( ts );
                let date = date_ob.getDate().toString();
                let month = ( date_ob.getMonth() + 1 ).toString();
                let year = date_ob.getFullYear().toString();
                let time = date_ob.getHours().toString() + "-" + date_ob.getMinutes().toString() + "-" + date_ob.getSeconds().toString();
                let orderdate = year + "-" + month + "-" + date + "-" + time;
                var order = new orders( {
                    userID: args.userID,
                    restaurantID: args.restaurantID,
                    orderStatus: args.orderStatus,
                    cancelled: "No",
                    orderMethod: args.orderMethod,
                    orderDate: orderdate,
                    dishes: args.dishes
                } )
                return order.save().then( response => {
                    // console.log( "review added", response )
                    return response

                } ).catch( error => {
                    console.log( "error adding review", error )
                    return error
                } )


            }
        },
        //update order status
        updateOrderStatus: {
            type: orderType,
            args: {
                orderID: { type: GraphQLString },
                orderStatus: { type: GraphQLString },

            },
            resolve ( parent, args ) {

                return orders.findByIdAndUpdate( { _id: args.orderID }, { $set: { orderStatus: args.orderStatus } }, { new: true } ).then( response => {
                    console.log( "Update success", response )
                    return response
                } ).catch( error => {
                    console.log( "Error updating orderstatus", error )
                    return error
                } )


            }
        },

    }
} )

const schema = new GraphQLSchema( {
    query: RootQuery,
    mutation: Mutation
} );

module.exports = schema;