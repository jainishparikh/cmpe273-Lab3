import React from 'react';
import { shallow } from 'enzyme';

import About from './About'

describe( 'About', () => {

    let axios = require( "axios" );
    let MockAdapter = require( "axios-mock-adapter" );
    let mock = new MockAdapter( axios );

    const userData =
    {
        userID: 8,
        name: "Goku",
        nickName: "DBZ",
        email: "user2@gmail.com",
        contactNumber: "3333333333",
        dateOfBirth: "2000-01-01",
        city: "San Jose",
        state: "California",
        country: "USA",
        headline: "I love Indian Cuisine",
        yelpingSince: "Sept 2020",
        thingsILove: "",
        blogLink: "",
        profilePicture: "myimage123.jpeg"

    }



    mock.onGet( "http://localhost:3001/users/about/user2@gmail.com" ).reply( 200,
        userData
    );


    let component

    beforeEach( () => {
        cookie.setCookie( "email", "user2@gmail.com" )
        component = shallow( <About debug /> );
    } );

    it( 'should render correctly in "debug" mode', () => {
        component.instance()
        expect( component ).toMatchSnapshot();
    } );

    it( 'validate cokkie has values', () => {
        expect( cookie.load( "email" ) ).toEqual( "user2@gmail.com" )
    } );

    it( 'check if userdata was recieved and matches', async ( done ) => {
        component
            .instance()
            .componentDidMount()
            .then( () => {
                expect( component.state().name ).toEqual( userData.name )
                expect( component.state().contactNumber ).toEqual( userData.contactNumber )
                done()
            } )
        expect( component ).toMatchSnapshot();
    } );

    // it( 'simulate checkbox to filter restaurants by curbside_pickup', async ( done ) => {
    //     component
    //         .instance()
    //         .componentDidMount()
    //         .then( () => {
    //             let restaurants_filter = component.find( 'input[type="checkbox"]' ).at( 0 )
    //             expect( component.state().filtered_restaurants ).toEqual( restaurants )
    //             restaurants_filter.simulate( 'change', { target: { checked: true, value: "curbside_pickup" } } )
    //             expect( component.state().filtered ).toEqual( "curbside_pickup" )
    //             expect( component.state().filtered_restaurants ).toEqual( filtered_restaurants )
    //             restaurants_filter.simulate( 'change', { target: { checked: false, value: "curbside_pickup" } } )
    //             expect( component.state().filtered ).toEqual( "" )
    //             expect( component.state().filtered_restaurants ).toEqual( restaurants )
    //             done()
    //         } )

    //     expect( component ).toMatchSnapshot();
    // } )

    // it( 'simulate search restaurants to search indian cuisine', async ( done ) => {
    //     component
    //         .instance()
    //         .componentDidMount()
    //         .then( () => {
    //             let search_options = component.find( 'select.searchOptions' )
    //             let search = component.find( 'input[type="text"]' )
    //             expect( component.state().filtered_restaurants ).toEqual( restaurants )
    //             search_options.simulate( 'keydown', { keyCode: 40 } )
    //             search_options.simulate( 'keydown', { keyCode: 13 } )
    //             search_options.simulate( 'change', { target: { name: "selectedOption", value: "cuisine" } } )
    //             expect( component.state().selectedOption ).toEqual( "cuisine" )
    //             search.simulate( 'change', { target: { name: "search", value: "indian" } } )
    //             expect( component.state().search ).toEqual( "indian" )
    //             component
    //                 .instance()
    //                 .searchRestaurants( {
    //                     preventDefault: () => {
    //                     }
    //                 } )
    //                 .then( () => {
    //                     expect( component.state().filtered_restaurants ).toEqual( filtered_restaurants )
    //                     done()
    //                 } )

    //             expect( component ).toMatchSnapshot();
    //         } )
    // } )

    // it( 'validate localstorage is empty', () => {
    //     localStorage.removeItem( "id" )
    //     localStorage.removeItem( "active" )
    //     expect( localStorage.store ).toEqual( {} )
    // } );

} )