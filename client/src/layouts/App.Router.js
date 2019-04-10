import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';

import initialState from '../config/initialState.config';
import configureStore from '../config/store.config';
import { ROUTES } from '../config/constants';

import AppLayout from './App.layout';
import App from '../components/containers/App';

import LoginLayout from './Login.layout';
import RegisterLayout from './Register.layout';


export const reduxStore = configureStore({ initialState });

const AppRouter = () => (
	<Provider store={reduxStore}>
		<Router history={browserHistory}>
			<Route path="/" component={AppLayout} >	

				<IndexRoute component={LoginLayout} />
				<Router path={ROUTES.REGISTER_LAYOUT} component={RegisterLayout} />
				
				<Route path={ROUTES.APP_LAYOUT} component={App}>
					<Route path={ROUTES.PEST_DETECTION_GALLERY} 
							getComponent={() => System.import('./Gallery.layout').then(c => c.default) } />
							
				</Route>								
				
			</Route>
		</Router>
	</Provider>
);


export default AppRouter;