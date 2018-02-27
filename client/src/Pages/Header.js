import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './../images/header/light-green-kspact.png';
import fire from './../fire.js';
import './../CSS/Header.css';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: fire.auth().currentUser
		};
	}

	componentWillMount() {
		// Handle changes in authentication state
        var self = this;
        fire.auth().onAuthStateChanged(function(user) {
            if (user) {
                self.setState({user: user});
            } else {
                self.setState({user: undefined});
            }
        });
	}

	render() {
		return (
			<div className="Header">
				<header>
					<div className="Navbar">
						<div className="Header-logo">
							<img src={logo} className="Logo-img" alt="logo" />
						</div>
						<div className="nav-body">
							<NavLink to="/home" className="nav-link">Home</NavLink>
						</div>
					</div>
				</header>
				<main>
					{this.props.children}
				</main>
			</div>
		);
	}
}

export default Header;