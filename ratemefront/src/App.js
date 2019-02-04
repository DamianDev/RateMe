import React, { Component } from 'react'
import {Router, Route, Link } from "react-router-dom"
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Login from '../src/pages/login/Login'
import Register from '../src/pages/register/Register'
import Home from '../src/pages/home/Home'
import Restaurant from '../src/pages/restaurant/Restaurant'
import Dashboard from './pages/dashboard/Dashboard'
import './App.css'
import history from './history'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isAdmin: false
    }
  }

  handleLogout = () => {
    sessionStorage.removeItem('token')
    window.location.reload()
    history.push("/login")
  }


  buttons() {
    if(sessionStorage.getItem('token') === null) {
      return (
        <div>
          <Link to="/login">
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="/register">
            <Button color="inherit">Register</Button>  
          </Link>
        </div>
      )
    } else {
      return (
        <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
      )
    }
  }

  render() {
    return (
      <Router history={history}>
          <div>
            <AppBar position="sticky" className="header">
              <Toolbar>
                <Typography variant="h6" color="inherit">
                  RateMe!
                </Typography>
                <Link to="/home">
                  <Button color="inherit">Home</Button>
                </Link>
                {this.buttons()}
              </Toolbar>
            </AppBar>
            <Route path="/" exact component={Home} />
            <Route path="/login/" component={Login} />
            <Route path="/register/" component={Register} />
            <Route path="/home/" component={Home} />
            <Route path="/restaurant" exact component={Restaurant} />
            <Route path="/dashboard" exact component={Dashboard}/>
            <Route path="/dashboard/:restaurantId" component={Dashboard} />
            <Route path="/restaurant/:restaurantId" component={Restaurant} />
          </div>
        </Router>
    );
  }
}

export default App;
