import React, { Component } from 'react';
import './Home.css'
import RestaurantList from '../../components/RestaurantList';

class Home extends Component {

constructor(props) {
    super(props);

    this.state = {
        restaurants: []
    }
}

componentDidMount(e) {
        fetch("http://localhost:8080/api/restaurants", {
            method: "get",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.success) {
                this.setState({restaurants: resp.restaurants})
            }
        })
}

render() {
    
    return (
        <RestaurantList restaurants={this.state.restaurants}/>
    );
  }
}
export default Home;