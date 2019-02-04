import React, { Component } from 'react';
import './RestaurantItem.css'
import Button from '@material-ui/core/Button'
import { Link } from "react-router-dom"

class RestaurantItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            rate: 1,
            isRated: false,
            error: ""
        }
    }

countRating(ratings) {

    if(ratings.length === 0)
        return "No ratings"

    var sum = 0;
    const mapped = ratings.map(function(r) {
        return parseInt(r.rating)
    })

    for(let rating of mapped) {
        sum += rating
    }

    return sum / mapped.length
}

handleChange = (e) => {
    this.setState({rate: e.target.value})
}

render() {
    const restaurant = this.props.restaurant

    return (
        <div className="card" key={restaurant.restaurantId}>
            <h5 className="card-header">{restaurant.name}</h5>
            <div className="card-body">
                <p className="card-text">Address: {restaurant.address}</p>
                <p className="card-text">Rating: {this.countRating(restaurant.ratings)}</p>
                <p className="card-text">Description: {restaurant.description}</p>
                <div className="footer">
                    <div className="detailsBtn">
                        <Link to={'/restaurant/' + restaurant.restaurantId} >
                            <Button variant="contained"
                                    color="primary"
                                    className="formItem">
                                details
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
export default RestaurantItem;