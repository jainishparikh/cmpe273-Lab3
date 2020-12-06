import React, { Component } from 'react'
import AddDishes from './AddDishes';
import Modal from 'react-modal';
import BACKEND_URL from '../../../config/config'
import cookie from 'react-cookies';

export class IndividualDish extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            dishID: this.props.dishData.dishID,
            dishName: this.props.dishData.dishName,
            dishIngrediants: this.props.dishData.dishIngrediants,
            dishPrice: this.props.dishData.dishPrice,
            dishDescription: this.props.dishData.dishDescription,
            dishCategory: this.props.dishData.dishCategory,
            dishPicture: this.props.dishData.dishPicture,
            dishPopUp: false
        }
    }

    toggleDishPopUp = ( e ) => {
        this.setState( {
            dishPopUp: !this.state.dishPopUp
        } )
    }

    displayPicture = ( name ) => {
        var dishImagePath = BACKEND_URL + "/images/dishes/" + name
        return (

            <img src={ dishImagePath } width="200px" height="180px" alt="" />

        )
    }

    render () {
        let dishOption =
            <div>
                <div className="edit-dish" >
                    <button className="btn btn-danger" onClick={ this.toggleDishPopUp }>Edit Dish</button>
                </div>

                <Modal isOpen={ this.state.dishPopUp } >
                    <AddDishes call="edit" dishData={ this.state } closePopUp={ this.toggleDishPopUp } />
                </Modal>
            </div>


        return (
            <div>
                <div className="row p-1 m-2" style={ { "width": "100%", "height": "200px", "background": "whitesmoke" } }>
                    <div className="col-4">
                        { this.displayPicture( this.state.dishPicture ) }
                    </div>
                    <div className='col-6'>
                        <div className='row'><h3>{ this.state.dishName }</h3></div>
                        <div className='row'><b>Cost: </b>${ this.state.dishPrice }</div>
                        <div className='row'><b>Category: </b>{ this.state.dishCategory }</div>
                        <div className='row'><b>Ingrediants: </b>{ this.state.dishIngrediants }</div>
                        <div className='row'><b>Description: </b>{ this.state.dishDescription }</div>
                    </div>
                    <div className="col-2">

                        { dishOption }
                    </div>

                </div>


            </div>
        )
    }
}


export default IndividualDish

