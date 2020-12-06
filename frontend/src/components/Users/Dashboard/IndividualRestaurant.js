import React, { Component } from 'react'
import BACKEND_URL from '../../../config/config'
import profile_picture from '../../../images/restaurant.jpeg'
import { Link } from 'react-router-dom';


export class IndividualRestaurant extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            profileImagePath: profile_picture,
        }
    }

    displayPicture = ( name ) => {
        if ( name === null || name === "" ) {
            var restaurantImagePath = profile_picture
        } else {
            var restaurantImagePath = BACKEND_URL + "/images/profilepics/" + name
        }
        return (

            <img src={ restaurantImagePath } width="200px" height="180px" alt="" />

        )
    }

    render () {
        return (
            <div style={ { "padding-top": "20px" } }>
                <div className="row" style={ { "width": "100%", "height": "180px", "background": "whitesmoke" } }>
                    <div className="col-4" style={ { "padding-left": "0px" } }>
                        { this.displayPicture( this.props.restaurantData.profilePicture ) }
                    </div>
                    <div className='col-6'>
                        <ul style={ { "list-style-type": "none", "paddinf-left": "0px" } }>
                            <li><h3>{ this.props.restaurantData.name }</h3></li>
                            <li>{ this.props.restaurantData.location }</li>
                            <li>{ this.props.restaurantData.restaurantType }</li>
                            <li>{ this.props.restaurantData.description }</li>
                            <li>{ this.props.restaurantData.timing }</li>
                        </ul>

                    </div>
                    <div className="col-2">
                        <Link className="btn btn-danger" to={ `/users/restaurantprofiles/${ this.props.restaurantData.email }/${ this.props.restaurantData.restaurantID }` } >
                            View Restaurant
                    </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default IndividualRestaurant
