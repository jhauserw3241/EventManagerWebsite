import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import People from './Pages/People/People';
import MemberApproval from './Pages/MemberApproval/MemberApproval';
import Agencies from './Pages/Agencies/Agencies';
import Events from './Pages/Events/Events';
import Event from './Pages/Event/Event';
import EventComponent from './Pages/EventComponent/EventComponent';
import PartnerComponent from './Pages/PartnerComponent/PartnerComponent';
import Dashboard from './Pages/Dashboard/Dashboard';
import Profile from './Pages/Profile/Profile';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Signout from './Pages/Signout/Signout';

export const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/home' component={Home} />
			<Route exact path='/people' component={People} />
			<Route exact path='/memberapproval' component={MemberApproval} />
			<Route exact path='/agencies' component={Agencies} />
			<Route exact path='/events' component={Events} />
			<Route exact path='/event/:id' component={Event} />
			<Route exact path='/event/:event_id/components/:component_id' component={EventComponent} />
			<Route exact path='/event/:event_id/partners' component={PartnerComponent} />
			<Route exact path='/dashboard' component={Dashboard} />
			<Route exact path='/profile' component={Profile} />
			<Route exact path='/login' component={Login} />
			<Route exact path='/signup' component={Signup} />
			<Route exact path='/signout' component={Signout} />
		</Switch>
	</main>
)