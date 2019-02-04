import React, { Component } from 'react';
import './Restaurant.css'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom"

function AlreadyRated(props) {
    const isRated = props.isRated
    const error = props.error
    if(isRated) {
        return <small className="errorMsg"> {error} </small>
    } else {
        return <small></small>
    }
}

class Restaurant extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            restaurant: null,
            authorized: false,
            hasErrors: false,
            errors: [],
            isFetching: true,
            rate: 1,
            isRated: false
        }
    }

    componentDidMount() {

        const { match: { params } } = this.props;
    
        if(params.restaurantId !== undefined) {
            fetch(`http://localhost:8080/api/restaurants/${params.restaurantId}`, {
                method: "get",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": "Bearer " + sessionStorage.getItem('token')
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    restaurant: resp.restaurant,
                    isFetching: false
                })
            })
        }

        fetch(`http://localhost:8080/api/users/admin`, {
            method: "get",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            this.setState({
                authorized: resp.admin
            })
        })

    }

    handleChange = (e) => {
        this.setState({rate: e.target.value})
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

handleRate = () => {
    const req = {
        restaurantId: this.state.restaurant.restaurantId,    
        rating: this.state.rate
    }

    fetch("http://localhost:8080/api/ratings", {
        method: "post",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + sessionStorage.getItem('token')
        },
        body: JSON.stringify(req)
    })
    .then(resp => resp.json())
    .then(resp => {
        if(!resp.success) {
            this.setState({error: resp.messages[0], isRated: true})
        }
        else {
            window.location.reload()
        }
    })
}

rateDiv() {
    if(sessionStorage.getItem('token') !== null) {
        return (
            <div className="rateWrapper">
                <div className="rate">
                    <select className="form-control" onChange={this.handleChange}>
                        <option value='1'>1 - Very Bad</option>
                        <option value='2'>2 - Bad</option>
                        <option value='3'>3 - So So</option>
                        <option value='4'>4 - Good</option>
                        <option value='5'>5 - Very Good</option>
                    </select>
                    <div className="btnArea">
                        <Button variant="contained"
                                color="primary"
                                className="formItem"
                                onClick={this.handleRate}>
                                Rate
                        </Button>
                    </div>
                </div>
                <AlreadyRated isRated={this.state.isRated} error={this.state.error}/>
            </div>
        )
    }
    else return null
}

adminButtons() {
    if(this.state.authorized) {
        const { restaurant } = this.state
        return (
            <div>
                <Link to={'/dashboard/' + restaurant.restaurantId} >
                    <Button variant="contained"
                            color="primary"
                            className="formItem">
                        Manage
                    </Button>
                </Link>
            </div>
        )
    }
    else return null
}

render() {

    const {restaurant} = this.state
    const {isFetching} = this.state

    if(!isFetching) {
        return (
            <div className="formWrapper">{
                (restaurant === 'undefined' || restaurant === null) ? <h1> Restaurant Not Found </h1> : (
                    <div>
                        <h1> Restaurant Details</h1>
                        <br></br>
                        <h2>Name: {restaurant.name}</h2>
                        <h2>Address: {restaurant.address}</h2>
                        <h2>Rating: {this.countRating(restaurant.ratings)}</h2>
                        <h2>Description: {restaurant.description}</h2>
                        {this.rateDiv()}
                        {this.adminButtons()}
                    </div>
                )
            }</div>
        );
    }
    else {
        return null
    }
  }
}
export default Restaurant;