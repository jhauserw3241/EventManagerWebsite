import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import People from './Pages/People/People';
import MemberApproval from './Pages/MemberApproval/MemberApproval';
import Agencies from './Pages/Agencies/Agencies';
import Events from './Pages/Events/Events';
import Event from './Pages/Event/Event';
import EventComponent from './Pages/EventComponent/EventComponent';
import EventPartnerComponent from './Pages/EventPartnerComponent/EventPartnerComponent';
import Products from './Pages/Products/Products';
import Product from './Pages/Product/Product';
import ProductComponent from './Pages/ProductComponent/ProductComponent';
import ProductPartnerComponent from './Pages/ProductPartnerComponent/ProductPartnerComponent';
import UserDashboard from './Pages/UserDashboard/UserDashboard';
import Profile from './Pages/Profile/Profile';
import AestheticSettings from './Pages/AestheticSettings/AestheticSettings';
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
			<Route exact path='/event/:event_id/component/:component_id' component={EventComponent} />
			<Route exact path='/event/:event_id/partners' component={EventPartnerComponent} />
			<Route exact path='/products' component={Products} />
			<Route exact path='/product/:id' component={Product} />
			<Route exact path='/product/:product_id/component/:component_id' component={ProductComponent} />
			<Route exact path='/product/:product_id/partners' component={ProductPartnerComponent} />
			<Route exact path='/dashboard' component={UserDashboard} />
			<Route exact path='/profile' component={Profile} />
			<Route exact path='/aestheticsettings' component={AestheticSettings} />
			<Route exact path='/login' component={Login} />
			<Route exact path='/signup' component={Signup} />
			<Route exact path='/signout' component={Signout} />
		</Switch>
	</main>
)