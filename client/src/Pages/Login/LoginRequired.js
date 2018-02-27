import { Component } from 'react';
import fire from './../../fire';

class LoginRequired extends Component {
    constructor(props) {
		super(props);
		this.state = {
            user: fire.auth().currentUser,
            requiredRole: "member"
		};
    }

    componentDidMount() {
        // Handle changes in authentication state
        var self = this;
        fire.auth().onAuthStateChanged(function(user) {
            if (user) {
                self.setState({user: user});
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

	render() {
        var self = this;

        // Check if a user is logged in
        if(this.state.user) {
            // Get the user's permission level
            var privs = "none";
            var contactsRef = fire.database().ref("contacts");
            contactsRef.orderByChild('email').equalTo(this.state.user.email).on("value", function(data) {
                if( (data.val() !== undefined) &&
                    (data.val() !== null)) {
                        var memberObj = data.val();
                        privs = memberObj[self.state.user.uid].priv;
                }
            });

            // Show the children if the user has the required permission level
            if(this.state.requiredRole === privs) {
                return this.props.children;
            } else {
                return null;
            }
        } else {
            return null;
        }
	}
}

export default LoginRequired;