import React from 'react';
import { shallow } from 'enzyme';

import Events from './Events'

describe( 'Events', () => {

    let axios = require( "axios" );
    let MockAdapter = require( "axios-mock-adapter" );
    let mock = new MockAdapter( axios );

    const eventsData = [
        {
            eventID: 8,
            eventName: "Food Delight",
            eventTime: "9:00 AM to 12:00 PM",
            eventDate: "2020-10-21",
            eventDescription: "Try Something New",
            eventLocation: "San Fransisco, CA",
            hashtags: "#Food#Fiesta",

        },
        {
            eventID: 11,
            eventName: "Food Fair",
            eventTime: "8:00 AM to 12:00 PM",
            eventDate: "2020-11-10",
            eventDescription: "Biggest Food Fair",
            eventLocation: "San Jose",
            hashtags: "#Food#Fair",

        }
    ]


    mock.onGet( "http://localhost:3001/events/restaurants/13" ).reply( 200,
        eventsData
    );


    let component

    beforeEach( () => {
        component = shallow( <Events debug /> );
    } );

    it( 'should render correctly in "debug" mode', () => {
        component.instance()
        expect( component ).toMatchSnapshot();
    } );

    it( 'check if all events by  a particular restaurant are received', async ( done ) => {
        component
            .instance()
            .componentDidMount()
            .then( () => {
                // console.log( component.state().Events )
                expect( component.state().Events ).toEqual( eventsData )
                done()
            } )
        expect( component ).toMatchSnapshot();
    } );

} )