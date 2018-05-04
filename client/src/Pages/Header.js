import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import fire from './../fire';
import logo from './../Images/logo.png';
import './../CSS/Header.css';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: fire.auth().currentUser,
			member: {},
		};
    }

    componentDidMount() {
        // Handle changes in authentication state
        var self = this;
        fire.auth().onAuthStateChanged(function(user) {
            if (user) {
				fire.database().ref("users").child(user.uid).on("value", function(data) {
					self.setState({ 
						user: user,
						member: data.val() ? data.val() : {},
					});
				})
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
							{ (this.state.user &&
								((this.state.member.status === "member") ||
								(this.state.member.status === "admin"))) ?
								<NavLink to="/people" className="nav-link">People</NavLink> : null }
							{ (this.state.user &&
								((this.state.member.status === "member") ||
								(this.state.member.status === "admin"))) ?
								<NavLink to="/agencies" className="nav-link">Agencies</NavLink> : null }
							{ (this.state.user &&
								((this.state.member.status === "member") ||
								(this.state.member.status === "admin"))) ?
								<NavLink to="/events" className="nav-link">Events</NavLink> : null }
							{ (this.state.user &&
								((this.state.member.status === "member") ||
								(this.state.member.status === "admin"))) ?
								<NavLink to="/products" className="nav-link">Products</NavLink> : null }
							{ this.state.user ?
								<NavLink to="/dashboard" className="nav-link">Dashboard</NavLink> : null }
							{ !this.state.user ?
								<NavLink to="/login" className="nav-link">Login</NavLink> : null }
							{ !this.state.user ?
								<NavLink to="/signup" className="nav-link">Signup</NavLink> : null }
							{ this.state.user ?
								<NavLink to="/signout" className="nav-link">Signout</NavLink> : null }
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