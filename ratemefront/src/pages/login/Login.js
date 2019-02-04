import React, { Component } from 'react';
import './Login.css'
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { FormGroup } from '@material-ui/core';
import Error from '../../components/Error'
import history from '../../history';

class Login extends Component {

constructor(props) {
    super(props);

    this.state = {
        username:'',
        password:'',
        hasErrors: false,
        errors: [],
        role: true
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
}

handleUsernameChange(e) {
    this.setState({username: e.target.value});
}

handlePasswordChange(e) {
    this.setState({password: e.target.value});
}

handleLogin(e) {
    var valid = true;
    if(valid) {
        const req = {
            username: this.state.username,    
            password: this.state.password
        }

        fetch("http://localhost:8080/api/auth/login", {
            method: "post",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(req)
        })
        .then(resp => resp.json())
        .then(resp => {

            if (!resp.success) {
                if(resp.status === 401) {
                    this.setState({hasErrors: true, errors: ["Invalid credentials"]})
                }
                else if(resp.status === 400) {
                    var errors = resp.errors.map(function(e) {
                        return e.defaultMessage
                    })
                    this.setState({hasErrors: true, errors: errors})
                }
            }
            else if(resp.success) {
                sessionStorage.setItem('token', resp.accessToken)
                window.location.reload()
                this.setState({hasErrors: false}, () => { history.push('/home') })
            }

        })
    }
}

render() {
    
    return (
        <div>
            <Error render={this.state.hasErrors} errors={this.state.errors}/>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}>
        
                <h1>
                    Log in
                </h1>

            <Grid item xs={3}>
                <FormGroup>
                        <TextField
                            id="standard-dense"
                            label="Username"
                            className="formItem"
                            style={{ marginBottom: '20px' }}
                            onChange={this.handleUsernameChange}/>

                        <TextField
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            className="formItem"
                            style={{ marginBottom: '20px' }}
                            onChange={this.handlePasswordChange}/>
                        
                        <Button variant="contained"
                                color="primary"
                                className="formItem"
                                onClick={this.handleLogin}>
                            Log in
                        </Button>
                </FormGroup>

                <p className="paragraph">
                    Do not have an account? <Link to='/register'>Register now!</Link>
                </p>
            </Grid>
        </Grid>
      </div>
    );
  }
}
export default Login;