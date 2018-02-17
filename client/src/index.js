import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Header from './Pages/Header';
import { Main } from './routes';
import './CSS/index.css';
import registerServiceWorker from './registerServiceWorker';

const App = () => (
	<div>
		<Header />
		<Main />
	</div>
)

render((
	<BrowserRouter>
		<div>
			<App />
		</div>
	</BrowserRouter>),
	document.getElementById('root')
);

registerServiceWorker();