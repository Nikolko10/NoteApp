import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main.jsx';

require( __dirname + '/../css/style.css' );

ReactDOM.render(
	<Main />,
	document.getElementById('root')
)