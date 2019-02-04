import React, { Component } from 'react';
import './Register.css'
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { FormGroup } from '@material-ui/core';
import { Redirect } from 'react-router'
import Error from '../../components/Error'

function InvalidUsername(props) {
    const validUsername = props.validUsername
    if(!validUsername) {
        return <small className="errorMsg"> Username must be between 5 and 15 chars </small>
    } else {
        return <small></small>
    }
}

function InvalidPassword(props) {
    const validPassword = props.validPassword
    if(!validPassword) {
        return <small className="errorMsg"> Password must be between 6 and 30 chars </small>
    } else {
        return <small></small>
    }
}

function InvalidPasswordConf(props) {
    const validPasswordConf = props.validPasswordConf
    if(!validPasswordConf) {
        return <small className="errorMsg"> Does not match with Password </small>
    } else {
        return <small></small>
    }
}

class Register extends Component {

constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
        passwordConfirm: '',
        validUsername: true,
        validPassword: true,
        validPasswordConf: true,
        redirect: false
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfChange = this.handlePasswordConfChange.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);

}

handleUsernameChange(e) {
    this.setState({username: e.target.value});
}

handlePasswordChange(e) {
    this.setState({password: e.target.value});
}

handlePasswordConfChange(e) {
    this.setState({passwordConfirm: e.target.value});
}

handleRegistration(e) {
    var valid = this.validate(this.state.username, this.state.password, this.state.passwordConfirm)

    if(valid) {
        const req = {
            username: this.state.username,    
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
        }

        fetch("http://localhost:8080/api/auth/register", {
            method: "post",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(req)
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.success) {
                this.setState({redirect: true, hasErrors: false})
            } else {
                this.setState({hasErrors: true, errors: resp.messages})
            }
        })
    }
}

validate(username, password, passwordConfirm) {
    var valid = true;
    
    this.setState({validUsername: true, validPassword: true, validPasswordConf: true})

    if(username.length < 5 || username.length > 15) {
        this.setState({validUsername: false})
        valid = false;
    }

    if(password.length < 6 || password.length > 30) {
        this.setState({validPassword: false})
        valid = false;
    }

    if(password !== passwordConfirm) {
        this.setState({validPasswordConf: false})
        valid = false;
    }

    return valid;
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
                        Registration
                    </h1>
            
                <Grid item xs={3}>
                    <FormGroup>
                            <TextField
                                id="inputUsername"
                                label="Username"
                                className="formItem"
                                style={{ marginBottom: '10px' }}
                                value={this.state.username}
                                onChange={this.handleUsernameChange}/>
                            <InvalidUsername validUsername={this.state.validUsername} />

                            <TextField
                                id="inputPassword"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                className="formItem"
                                style={{ marginBottom: '10px' }}
                                value={this.state.password}
                                onChange={this.handlePasswordChange}/>
                            <InvalidPassword validPassword={this.state.validPassword} />

                            <TextField
                                id="inputPasswordConfirm"
                                label="Confirm Password"
                                type="password"
                                autoComplete="current-password"
                                className="formItem"
                                style={{ marginBottom: '10px' }}
                                value={this.state.passwordConfirm}
                                onChange={this.handlePasswordConfChange}/>
                            <InvalidPasswordConf validPasswordConf={this.state.validPasswordConf} />

                            <Button variant="contained"
                                    color="primary"
                                    className="formItem"
                                    onClick={this.handleRegistration}>
                                Register
                            </Button>
                            {this.state.redirect && ( <Redirect to='/login'/> )}
                    </FormGroup>

                    <p className="paragraph">
                        Already have an account? <Link to='/login'>Log in!</Link>
                    </p>
                </Grid>   
            </Grid>
        </div>
    );
  }
}
export default Register;

// <div>
// <form className='registerForm'>
//     <div className="form-group">
//         {/* <label>Username</label> */}
//         <input type="text" className="form-control" id="inputUsername" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} />
//     </div>
//     <div className="form-group">
//         {/* <label>Password</label> */}
//         <input type="password" className="form-control" id="inputPassword" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
//     </div>
//     <div className="form-group">
//         {/* <label>Confirm Password</label> */}
//         <input type="password" className="form-control" id="inputPasswordConf" placeholder="Confirm Password" value={this.state.passwordConfirm} onChange={this.handlePasswordConfChange}/>
//     </div>
//     <button type="submit" className="btn btn-primary" onSubmit={this.handleRegistration}>Register</button>
// </form>
// <p className="paragraph">
//     Already have an account? <Link to='/login'>Log in!</Link>
// </p>
// </div>