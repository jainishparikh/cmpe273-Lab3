import React from 'react';
import { shallow } from 'enzyme';

import IndividualOrder from './IndividualOrder'

describe( 'IndividualOrder', () => {

    let axios = require( "axios" );
    let MockAdapter = require( "axios-mock-adapter" );
    let mock = new MockAdapter( axios );

    const restaurantData =
    {
        restaurantID: 15,
        name: "Thali",
        email: "thethali@gmail.com",
        contact: "12121212121212",
        location: "954 E El Camino Real, Sunnyvale, CA 94087",
        description: "Best Indian Restaurant in San Jose",
        timing: "8:00 AM to 10:00 PM",

    }



    mock.onGet( "http://localhost:3001/restaurants/aboutbyID/15" ).reply( 200,
        restaurantData
    );


    let component

    beforeEach( () => {
        component = shallow( <IndividualOrder debug /> );
    } );

    it( 'should render correctly in "debug" mode', () => {
        component.instance()
        expect( component ).toMatchSnapshot();
    } );

    it( 'check if restaurant data for a particular order is received', async ( done ) => {
        component
            .instance()
            .componentDidMount()
            .then( () => {
                expect( component.state().restaurantData ).toEqual( restaurantData )
                done()
            } )
        expect( component ).toMatchSnapshot();
    } );



} )