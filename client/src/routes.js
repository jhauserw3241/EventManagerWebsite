import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Events from './Pages/Events/Events';
import Login from './Pages/Login/Login';
import Signout from './Pages/Signout/Signout';

export const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/home' component={Home} />
			<Route exact path='/events' component={Events} />
			<Route exact path='/login' component={Login} />
			<Route exact path='/signout' component={Signout} />
		</Switch>
	</main>
)