import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class Maps extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            center: {
                lat: 33.33,
                lng: 122.90,
            },
        }

    }




    render () {
        let locations = this.props.restaurantData.map( restaurant => {
            // console.log( "restaurant", restaurant.name, restaurant.latitude, restaurant.longitude )

            return (
                <Marker name={ restaurant.name } position={ { lat: restaurant.latitude, lng: restaurant.longitude } } />
            )

        } )

        return (
            <div style={ { "marginTop": "20px", height: '70vh', width: '80%', "border": "1px solid gray" } }>
                <Map
                    google={ this.props.google }
                    zoom={ 9 }
                    className={ 'map' }
                    initialCenter={ { lat: 37.33, lng: -121.89 } }

                >
                    { locations }
                </Map>
            </div>
        )
    }
}



export default GoogleApiWrapper( {
    apiKey: "AIzaSyCQYNrspA9KMomMhP23bp6Qlmk7ZPK9eA4"
} )( Maps )
