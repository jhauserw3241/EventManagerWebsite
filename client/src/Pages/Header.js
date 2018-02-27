import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './../Images/logo.svg';
import './../CSS/Header.css';

class Header extends Component {
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
							<NavLink to="/login" className="nav-link">Login</NavLink>
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