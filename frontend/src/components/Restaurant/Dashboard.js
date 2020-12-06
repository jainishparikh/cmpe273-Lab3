import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
export class Dashboard extends Component {
    render () {
        if ( !cookie.load( 'auth' ) ) {
            return <Redirect to='/login' />
        }

        return (
            <div>
                <h1>Restaurant Dashboard</h1>
            </div>
        )
    }
}

export default Dashboard
