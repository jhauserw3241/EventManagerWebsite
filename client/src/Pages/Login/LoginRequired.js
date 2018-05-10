import { Component } from 'react';
import fire from './../../fire';

class LoginRequired extends Component {
    constructor(props) {
        super(props);

		this.state = {
            user: fire.auth().currentUser,
            priv: "none",
            requiredRole: "member",
        };
        
        this.hasPrivs = this.hasPrivs.bind(this);
    }

    componentDidMount() {
        // Handle changes in authentication state
        var self = this;
        fire.auth().onAuthStateChanged(function(user) {
            if (user) {
                // Get privilege level information
                fire.database().ref("users").child(user.uid).on("value", function(data) {
                    var member = data.val() ? data.val() : {};

                    self.setState({
                        user: user,
                        priv: member.status ? member.status : "none",
                    });
                });
            } else {
                self.setState({user: undefined});
            }
        });

        // Check if a higher permission requirement is required to see the child information
        if( (this.props !== undefined) &&
            (this.props.requiredRole !== undefined) &&
            (this.props.requiredRole !== null) &&
            (this.props.requiredRole !== "")) {
            this.setState({requiredRole: this.props.requiredRole});
        }
    }

    hasPrivs() {
        switch(this.state.requiredRole) {
            case "none":
                return this.state.priv === "none";
            case "member":
                return (this.state.priv === "member") ||
                    (this.state.priv === "admin");
            case "admin":
                return this.state.priv === "admin";
            default:
                return false;
        }
    }

	render() {
        return this.hasPrivs() ? this.props.children : null;
	}
}

export default LoginRequired;