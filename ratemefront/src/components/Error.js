import React, { Component } from 'react';
import './Error.css'

class Error extends Component {
    
createMessages() {
    let messgaes = [];
    const render = this.props.render
    const errors = this.props.errors
    
    if(render) {
        for(let i = 0; i < errors.length; i++) {
            messgaes.push(<div key={i} className="alert alert-danger" role="alert"> {errors[i]} </div>);
        }
    }

    return messgaes;
}

render() {
    return (
        <div> {this.createMessages()} </div>
    );
  }
}
export default Error;