import React, { Component } from 'react'
import yelp_home from "../../images/yelp_home.jpeg";

export class home extends Component {
    render () {
        return (
            <div>
                <div className="row" style={ { "height": "100vh" } }>
                    {/* <div className="col-2"></div>
                    <div className="col-8"> </div>
                    <div className="col-2"></div> */}
                    <img src={ yelp_home } width="100%" height="95%" alt="" />
                </div>

            </div>
        )
    }
}

export default home
