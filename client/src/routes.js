import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Events from './Pages/Events/Events';
import Event from './Pages/Event/Event';
import Agenda from './Pages/Agenda/Agenda';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Signout from './Pages/Signout/Signout';

export const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/home' component={Home} />
			<Route exact path='/events' component={Events} />
			<Route exact path='/event/:id' component={Event} />
			<Route exact path='/agenda/:id' component={Agenda} />
			<Route exact path='/login' component={Login} />
			<Route exact path='/signup' component={Signup} />
			<Route exact path='/signout' component={Signout} />
		</Switch>
	</main>
)