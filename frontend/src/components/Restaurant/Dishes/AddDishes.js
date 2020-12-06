import React, { Component } from 'react'
import { Redirect } from 'react-router';
//import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import axios from 'axios';
import BACKEND_URL from '../../../config/config'


export class AddDishes extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            dishID: "",
            dishName: "",
            dishIngrediants: "",
            dishpPrice: "",
            dishDescription: "",
            dishCategory: "",
            dishImageUpdate: false,
            newDishImage: "",
            dishImagePath: "",
        }
    }

    //filling up state if this is an edit request
    componentDidMount () {
        if ( this.props.call === "edit" ) {
            this.setState( {
                dishID: this.props.dishData.dishID,
                dishName: this.props.dishData.dishName,
                dishIngrediants: this.props.dishData.dishIngrediants,
                dishPrice: this.props.dishData.dishPrice,
                dishDescription: this.props.dishData.dishDescription,
                dishCategory: this.props.dishData.dishCategory,
                dishImageUpdate: false,
                newDishImage: "",
                dishImagePath: BACKEND_URL + "/images/dishes/" + this.props.dishData.dishPicture,
            } )
        }
    }

    //handle input change
    handleInputChange = inp => {
        // console.log( inp.target.name, inp.target.value );
        this.setState( {
            [ inp.target.name ]: inp.target.value
        } )
    }
    //handle on Submit
    handleOnSubmit = sub => {
        sub.preventDefault();
        if ( this.props.call === "edit" ) {
            var dishData = {
                dishID: this.state.dishID,
                dishName: this.state.dishName,
                dishIngrediants: this.state.dishIngrediants,
                dishPrice: this.state.dishPrice,
                dishDescription: this.state.dishDescription,
                dishCategory: this.state.dishCategory

            }

            var api_path = "";
            if ( this.state.newDishImage === "" ) {
                console.log( "without new image" )
                var formData = dishData;
                var config = {
                    headers: {
                        'content-type': 'application/json'
                    }
                }
                api_path = "/restaurants/dishes/withoutimage"
            } else {
                api_path = "/restaurants/dishes/withimage"
                var formData = new FormData();
                formData.append( 'myImage', this.state.newDishImage, this.state.newDishImage.name )

                for ( var key in dishData ) {
                    formData.append( key, dishData[ key ] );
                }

                var config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
            }
            console.log( formData );
            axios
                .put( BACKEND_URL + api_path, formData, config ).then( response => {
                    if ( response.status === 200 ) {
                        console.log( "dish successfully added" + response );

                        window.location.assign( "/restaurants/about" )
                    }
                } ).catch( err => {
                    console.log( "Error in adding dish" );
                } )

        } else {
            var dishData = {
                restaurantID: cookie.load( 'id' ),
                dishName: this.state.dishName,
                dishIngrediants: this.state.dishIngrediants,
                dishPrice: this.state.dishPrice,
                dishDescription: this.state.dishDescription,
                dishCategory: this.state.dishCategory

            }
            const formData = new FormData();
            formData.append( 'myImage', this.state.newDishImage, this.state.newDishImage.name )
            for ( var key in dishData ) {
                formData.append( key, dishData[ key ] );
            }
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            axios
                .post( BACKEND_URL + "/restaurants/dishes", formData, config ).then( response => {
                    if ( response.status === 200 ) {
                        console.log( "dish successfully added" + response );

                        window.location.assign( "/restaurants/about" )
                    }
                } ).catch( err => {
                    console.log( "Error in adding dish" );
                } )
        }


    }


    //Image Upload toggle
    toggleImageUpdate = ( e ) => {
        this.setState( {
            dishImageUpdate: !this.state.dishImageUpdate
        } )
    }

    //Image Upload
    handleImageUpload = ( e ) => {
        this.setState( {
            newDishImage: e.target.files[ 0 ],
            dishImageUpdate: true
        } )
    }

    //Image Submit
    // handleImageSubmit = ( data ) => {
    //     const formData = new FormData();
    //     formData.append( 'myImage', this.state.newDishImage, this.state.newDishImage.name )
    //     formData.append( 'dishID', data.insertId )
    //     formData.append( 'restaurantID', cookie.load( 'id' ) )
    //     const config = {
    //         headers: {
    //             'content-type': 'multipart/form-data'
    //         }
    //     }
    //     axios
    //         .post( BACKEND_URL + '/restaurants/uploadpicture', formData, config ).then( ( response ) => {
    //             console.log( response.data )
    //             // this.props.closePopUp();
    //             window.location.assign( "/restaurants/about" )
    //         } ).catch( err => {
    //             console.log( "Error in dish image upload: ", err );
    //         } )

    // }

    render () {
        var redirectVar = null;
        if ( !cookie.load( "auth" ) ) {
            redirectVar = <Redirect to="/login" />
        }
        return (
            <div>
                { redirectVar }

                <div className="container" >

                    <form onSubmit={ this.handleOnSubmit }>
                        <div className="row mt-2">
                            <input type="file" name="newDishImage" onChange={ this.handleImageUpload } />

                        </div>
                        <div className="row mt-2">
                            <div className="col-3">
                                Dish Name: <input type="text" className="form-control" name="dishName" required
                                    placeholder={ this.state.dishName } onChange={ this.handleInputChange } />
                            </div>
                            <div className="col-3">
                                Dish Price: <input type="text" className="form-control" name="dishPrice" required
                                    placeholder={ this.state.dishPrice } onChange={ this.handleInputChange } />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                Category:<input type="text" className="form-control" name="dishCategory" required
                                    placeholder={ this.state.dishCategory } onChange={ this.handleInputChange } />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                Description: <input type="text" className="form-control" name="dishDescription" required
                                    placeholder={ this.state.dishDescription } onChange={ this.handleInputChange } />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                Ingrediants: <input type="text" className="form-control" name="dishIngrediants" required
                                    placeholder={ this.state.dishIngrediants } onChange={ this.handleInputChange } />
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-3">
                                <button type="submit" className="btn btn-primary">Add</button>
                            </div>
                            <div className="col-3">
                                <button className="btn btn-danger" onClick={ this.props.closePopUp }>Cancel</button>
                            </div>

                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default AddDishes
