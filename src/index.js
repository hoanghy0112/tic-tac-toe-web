import { render } from 'react-dom';
import React from 'react';
import App from './renderer/components/App';

import { Provider } from 'react-redux';
import store from './renderer/app/store';

render(
	<React.StrictMode>
		<Provider store={store}>
			<App></App>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
