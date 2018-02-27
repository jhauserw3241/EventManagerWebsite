import React, { Component } from 'react';
import LoginRequired from './../Login/LoginRequired';

class Home extends Component {
	render() {
		return (
			<div className="Home">
				<div className="container">
					<div className="content">
						This is the home page. Welcome!

						<LoginRequired>
							<br />
							<br />
							Secrets!!
						</LoginRequired>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
