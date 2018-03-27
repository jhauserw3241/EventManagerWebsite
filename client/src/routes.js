import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import People from './Pages/People/People';
import Events from './Pages/Events/Events';
import Event from './Pages/Event/Event';
import EventComponent from './Pages/EventComponent/EventComponent';
import PartnerComponent from './Pages/PartnerComponent/PartnerComponent';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Signout from './Pages/Signout/Signout';

export const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/home' component={Home} />
			<Route exact path='/people' component={People} />
			<Route exact path='/events' component={Events} />
			<Route exact path='/event/:id' component={Event} />
			<Route exact path='/event/:event_id/components/:component_id' component={EventComponent} />
			<Route exact path='/event/:event_id/partners' component={PartnerComponent} />
			<Route exact path='/login' component={Login} />
			<Route exact path='/signup' component={Signup} />
			<Route exact path='/signout' component={Signout} />
		</Switch>
	</main>
)