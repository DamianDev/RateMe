import React, { Component } from 'react'
import './Dashboard.css'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { FormGroup } from '@material-ui/core'
import Error from '../../components/Error'
import history from '../../history'
import { Link } from "react-router-dom"

function InvalidName(props) {
    const validName = props.validName
    if(!validName) {
        return <small className="errorMsg"> Name must be between 3 and 30 chars </small>
    } else {
        return null
    }
}

function InvalidAddress(props) {
    const validAddress = props.validAddress
    if(!validAddress) {
        return <small className="errorMsg"> Address must be between 10 and 30 chars </small>
    } else {
        return null
    }
}

function InvalidDescription(props) {
    const validDescription = props.validDescription
    if(!validDescription) {
        return <small className="errorMsg"> Description should not exceed 60 chars </small>
    } else {
        return null
    }
}

class Dashboard extends Component {

constructor(props) {
    super(props);

    this.state = {
        isAdmin: false,
        isFetching: true,
        restaurantId: 0,
        name: '',
        address: '',
        description: '',
        hasErrors: false,
        errors: [],
        validName: true,
        validAddress: true,
        validDescription: true
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
            if(resp.restaurant !== null) {
                this.setState({
                    restaurantId: resp.restaurant.restaurantId, 
                    name: resp.restaurant.name,
                    address: resp.restaurant.address,
                    description: resp.restaurant.description
                })
            }
        })
    }

    fetch("http://localhost:8080/api/users/admin", {
        method: "get",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + sessionStorage.getItem('token')
        }
    })
    .then(resp => resp.json())
    .then(resp => {
            this.setState({ isAdmin: resp.admin, isFetching: false })
    })
}

validate(name, address, description) {
    var valid = true;
    
    this.setState({validName: true, validAddress: true, validDescription: true})

    if(name.length < 3 || name.length > 30) {
        this.setState({validName: false})
        valid = false;
    }

    if(address.length < 10 || address.length > 30) {
        this.setState({validAddress: false})
        valid = false;
    }

    if(description.length > 60) {
        this.setState({validDescription: false})
        valid = false;
    }

    return valid;
}

handleNameChange = (e) => {
    this.setState({name: e.target.value})
}

handleAddressChange = (e) => {
    this.setState({address: e.target.value})
}

handleDescriptionChange = (e) => {
    this.setState({description: e.target.value})
}

handleAdd = () => {
    let valid = this.validate(this.state.name, this.state.address, this.state.description);

    if(valid) {
        const req = {
            restaurantId: this.state.restaurantId,
            name: this.state.name,
            address: this.state.address,
            description: this.state.description
        }

        fetch("http://localhost:8080/api/restaurants", {
            method: "post",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            },
            body: JSON.stringify(req)
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.success) {
                history.push('/home')
            } else {
                if(resp.status === 403) {
                    this.setState({hasErrors: true, errors: ['You are not authorized to perform this action!']})
                }
            }
        })
    }
    
}

handleEdit = () => {
    let valid = this.validate(this.state.name, this.state.address, this.state.description);

    if(valid) {
        const req = {
            restaurantId: this.state.restaurantId,
            name: this.state.name,
            address: this.state.address,
            description: this.state.description
        }

        fetch("http://localhost:8080/api/restaurants", {
            method: "put",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            },
            body: JSON.stringify(req)
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.success) {
                history.push('/restaurant/' + this.state.restaurantId)
            } else {
                if(resp.status === 403) {
                    this.setState({hasErrors: true, errors: ['You are not authorized to perform this action!']})
                }
            }
        })
    } 
}

handleDelete = () => {
    let valid = this.validate(this.state.name, this.state.address, this.state.description);

    if(valid) {
        const req = {
            restaurantId: this.state.restaurantId
        }

        fetch("http://localhost:8080/api/restaurants", {
            method: "delete",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            },
            body: JSON.stringify(req)
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.success) {
                history.push('/home')
            } else {
                if(resp.status === 403) {
                    this.setState({hasErrors: true, errors: ['You are not authorized to perform this action!']})
                }
            }
        })
    } 
}

render() {
    const {isFetching} = this.state
    const {isAdmin} = this.state

    return (
        <div>
        {
            isFetching ? null : (
                !isAdmin ? <h1> You are not authorized! </h1> : (
                    <div className="formWrapper dashboard">
                        <Error render={this.state.hasErrors} errors={this.state.errors} />
                            <FormGroup>
                                    <TextField
                                        id="standard-dense"
                                        label="Name"
                                        value={this.state.name}
                                        style={{ marginBottom: '20px', marginTop: '20px' }}
                                        onChange={this.handleNameChange}/>
                                    <InvalidName validName={this.state.validName} />

                                    <TextField
                                        id="standard-dense"
                                        label="Address"
                                        multiline
                                        rows="3"
                                        value={this.state.address}
                                        style={{ marginBottom: '20px' }}
                                        onChange={this.handleAddressChange}/>
                                    <InvalidAddress validAddress={this.state.validAddress} />
                                    
                                    <TextField
                                        id="filled-multiline-static"
                                        label="Desacription"
                                        multiline
                                        rows="6"
                                        value={this.state.description}
                                        margin="normal"
                                        onChange={this.handleDescriptionChange}/>
                                    <InvalidDescription validDescription={this.state.validDescription} />
                                    {
                                        this.state.restaurantId === 0 ? (
                                            <Button variant="contained"
                                                color="primary"
                                                onClick={this.handleAdd}>
                                                Add
                                            </Button>
                                        ) : (
                                            <div className="buttons">
                                                <Button variant="contained"
                                                    color="primary"
                                                    onClick={this.handleEdit}>
                                                    Edit
                                                </Button>
                                                <Button variant="contained"
                                                    color="primary"
                                                    style={{marginLeft: 10}}
                                                    onClick={this.handleDelete}>
                                                    Delete
                                                </Button>
                                            </div>
                                        )
                                    }
                            </FormGroup>
                            <div className="center">
                                <Link to={"/restaurant/" + this.state.restaurantId}>
                                    <Button variant="contained"
                                            color="primary"
                                            style={{marginLeft: 10}}>
                                            Back
                                    </Button>
                                </Link>
                            </div>
                    </div>
                )         
            )
        }
        </div>
    )
  }
}
export default Dashboard;