import React, { Component } from 'react';
import './Menu.css'
import {Link} from 'react-router-dom';

class Menu extends Component {

constructor(props) {
    super(props);

    this.state = {

    }
}

render() {
    return (
        <nav className="navbar navbar-dark ">
            <a className="navbar-brand">RateMe</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link">Add restaurant (Admin)<span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link">Edit restaurant (Admin)</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link">Log in</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled">Register</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
  }
}
export default Menu;