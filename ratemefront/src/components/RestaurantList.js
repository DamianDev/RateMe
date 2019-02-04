import React, { Component } from 'react';
import './RestaurantList.css'
import RestaurantItem from './RestaurantItem';
import Button from '@material-ui/core/Button'
import { Link } from "react-router-dom"

class RestaurantList extends Component {

constructor(props) {
    super(props)

    this.state = {
        isAdmin: false
    }
}

componentDidMount() {
    fetch("http://localhost:8080/api/users/admin", {
        method: "get",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + sessionStorage.getItem('token')
        }
    })
    .then(resp => resp.json())
    .then(resp => {
          this.setState({isAdmin: resp.admin})
    })
}

addBtn() {
    if(this.state.isAdmin) {
        return (
            <div className="center">
                <Link to='/dashboard' >
                    <Button variant="contained"
                            color="primary">
                        New restaurant
                    </Button>
                </Link>
            </div>
        )
    }
    else return null
}

listRestaurants() {
    let list = [];
    const restaurants = this.props.restaurants
    
    
    for(let i = 0; i < restaurants.length; i++) {
        list.push(
            <RestaurantItem restaurant={restaurants[i]} key={restaurants[i].restaurantId} />
        );
    }
    return list;
}

render() {
    return (
        <div>
            {this.listRestaurants()}
            {this.addBtn()}
        </div>
    );
  }
}
export default RestaurantList;